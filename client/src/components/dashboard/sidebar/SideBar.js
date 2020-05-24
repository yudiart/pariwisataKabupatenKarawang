import React, {Fragment, useState} from 'react';
import './Sidebar.css'
import ToggleButton from "./ToggleButton";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import PropTypes from 'prop-types';
import Spinner from "../../layout/Spinner";
import NavItems from "./child/navitems";
import RightContent from "../content/RightContent";
import NavDash from "../pages/navbar/navDash";

const SideBar =({auth: { loading}}) => {
    const [state,setState]=useState(false);

    const toggleClickHandler =()=>{
        setState((prevState)=>{
            return{sideToggleOpen: !prevState.sideToggleOpen}
        });
    };
    let nav = 'sidenav';
    let right = 'right-bar';
    let sidebar = 'sidebar';
    let text = 'navtext';
    let classes = 'sidenav-nav';
    if (state.sideToggleOpen){
        text = 'navtext open';
        right ='right-bar open';
        sidebar = 'sidebar open';
        nav = 'sidenav open';
        classes ='sidenav-nav open';
    }

    return(
        loading ? <Spinner/>:
        <Fragment>
            <div className={sidebar}>
                <nav className={nav}>
                    <ToggleButton click={toggleClickHandler}/>
                    <div className={classes} role='presentation'>
                        <NavItems text={text}/>
                    </div>
                </nav>
            </div>
            <div className={right}>
                <RightContent />
            </div>
        </Fragment>
    )
}

SideBar.propTypes ={
    auth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {})
    (SideBar);