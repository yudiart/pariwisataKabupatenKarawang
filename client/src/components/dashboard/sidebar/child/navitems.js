import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../../../actions/auth";

const NavItems = ({auth:{user,loading},text,logout})=>{
    return (
        <div>
            {user && user.role === 'admin'?
                <>
                    <Link to={'/dashboard'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-view-dashboard'/>
                        </div>
                        <div className={text}>Dashboard</div>
                    </Link>
                    <Link to={'/dashboard/pages1'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-home'/>
                        </div>
                        <div className={text}>Display Room</div>
                    </Link>
                    <Link to={'/dashboard/pages2'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-chart-areaspline'/>
                        </div>
                        <div className={text}>Statistic</div>
                    </Link>
                    <Link to={'/dashboard/pages3'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-file-chart'/>
                        </div>
                        <div className={text}>Report</div>
                    </Link>
                    <Link to={'/dashboard/pages4'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-file-chart'/>
                        </div>
                        <div className={text}>Report</div>
                    </Link>
                </>
                :null}
            {user && user.role === 'villa'?
                <>
                    <Link to={'/dashboard'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-view-dashboard'/>
                        </div>
                        <div className={text}>Dashboard</div>
                    </Link>
                    <Link to={'/dashboard/room'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-home'/>
                        </div>
                        <div className={text}>Display Room</div>
                    </Link>
                    <Link to={'/dashboard/statistic'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-chart-areaspline'/>
                        </div>
                        <div className={text}>Statistic</div>
                    </Link>
                    <Link to={'/dashboard/report'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-file-chart'/>
                        </div>
                        <div className={text}>Report</div>
                    </Link>
                    <Link to={'/dashboard/settings'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-settings'/>
                        </div>
                        <div className={text}>Settings</div>
                    </Link>
                </>:null
            }
            {user && user.role === 'customer'?
                <>
                    <Link to={'/dashboard/room'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-home'/>
                        </div>
                        <div className={text}>Profile</div>
                    </Link>
                    <Link to={'/dashboard/settings'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-settings'/>
                        </div>
                        <div className={text}>Log Transaction</div>
                    </Link>
                    <Link to={'/dashboard/statistic'} className='navitem'>
                        <div className="navicon">
                            <i className='mdi mdi-chart-areaspline'/>
                        </div>
                        <div className={text}>Wishlist</div>
                    </Link>
                </>:null
            }

            <Link to={'/login'} className='navitem' onClick={logout}>
                <div className="navicon">
                    <i className='mdi mdi-logout'/>
                </div>
                <div className={text}>
                    Logout
                </div>
            </Link>
        </div>
    )
}

NavItems.propTypes={
    logout: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{logout})(NavItems);