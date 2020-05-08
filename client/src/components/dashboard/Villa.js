import React, {Fragment, useEffect} from 'react';
import DashboardVilla from "../../DashboardVilla";
import Footer from "../../footer/Footer";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentVilla} from "../../../../actions/villa";
import {getCurrentRooms} from "../../../../actions/room";

const Villa = ({
                          getCurrentVilla,
                          getCurrentRooms,
                          isAuthenticated,
                          auth: { user },
                          room:{room},
                          villa: { villa, loading }
                      })=>{
    useEffect(() => {
        getCurrentVilla();
        getCurrentRooms();
    }, [getCurrentVilla,getCurrentRooms]);
    return(
        <div><>
            <div className="jumbotron bg-gradient">
                <h1 className="large text-center text-white">Welcome {user && user.name}</h1>
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
            <Fragment>

            </Fragment>
        </><h1>Display Villa</h1>
        </div>
    )
}

Villa.propTypes = {
    getCurrentVilla: PropTypes.func.isRequired,
    getCurrentRooms: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    villa: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    villa: state.villa,
    room: state.room,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getCurrentVilla,getCurrentRooms}
)(Villa);