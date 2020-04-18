import React, { Fragment, useEffect } from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
    isAuthenticated,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (isAuthenticated && user && user.role === 'customer'){
    return <Redirect to={'/profile'}/>
  }
  return loading  ? (
    <Spinner />
  ) : (
    <Fragment>
      {user && user.role === 'villa' ?
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {user && user.role}
          {profile !== null? (
              <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2">
                  <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus" /> Delete Account
                  </button>
                </div>
              </Fragment>
          ) : (
              <Fragment>
                <p>You do not have a profile, please setup your profile </p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </Fragment>
          )}
        </>
      :(
        <div><h1>admin</h1></div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
