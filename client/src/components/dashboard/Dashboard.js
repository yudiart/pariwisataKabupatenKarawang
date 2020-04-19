import React, { Fragment, useEffect } from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentVilla } from "../../actions/villa";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
    getCurrentVilla,
    isAuthenticated,
  auth: { user },
  villa: { villa, loading }
}) => {
  useEffect(() => {
    getCurrentVilla();
  }, [getCurrentVilla]);

  if (isAuthenticated && user && user.role === 'customer'){
    return <Redirect to={'/profile'}/>
  }
  return loading  ? (
    <Spinner />
  ) : (
    <Fragment>
      {user && user.role === 'villa' ?
        //Villa
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {user && user.role}
          {villa !== null? (
              <Fragment>
                <div className="my-2">
                  <DashboardActions/>
                  <button className="btn btn-danger">
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
        //admin
        <Fragment>
          <div className="jumbotron">
            <h1>{user && user.role}</h1>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentVilla: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  villa: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  villa: state.villa,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getCurrentVilla }
)(Dashboard);
