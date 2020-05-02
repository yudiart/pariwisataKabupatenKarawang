import React, { Fragment, useEffect } from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentVilla, logout } from "../../actions/villa";
import { getCurrentRooms } from "../../actions/room";
import DashboardVilla from "./DashboardVilla";
import Footer from "./footer/Footer";

import DashboardAdmin from "./admin/Admin";


export const Dashboard = ({
    getCurrentVilla,
   getCurrentRooms,
    isAuthenticated,
  auth: { user },
  room:{room},
  villa: { villa, loading },logout
}) => {

  useEffect(() => {
    getCurrentVilla();
    getCurrentRooms();
  }, [getCurrentVilla,getCurrentRooms]);

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
          <div className="jumbotron bg-gradient">
            <h1 className="large text-center text-white">Welcome {user && user.name}</h1>
            <div className=''>
              <Link onClick={logout} className='nav-link' to={'/villa/login'} style={{cursor:'pointer'}}><i className="fas fa-sign-out-alt"/>{" "}Logout</Link>
            </div>
          </div>
          {villa !== null? (
              <Fragment>
                <Fragment>
                  <div className='mt-4'>
                    <DashboardVilla/>
                  </div>
                </Fragment>
                <Fragment>
                  <div className='mt-4'>
                    <Footer/>
                  </div>
                </Fragment>
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
          <DashboardAdmin/>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentVilla: PropTypes.func.isRequired,
  getCurrentRooms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  villa: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  villa: state.villa,
  room: state.room,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getCurrentVilla,getCurrentRooms,logout}
)(Dashboard);
