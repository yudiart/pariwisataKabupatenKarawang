import React, {Component, useEffect} from "react";
import Navbar from "./header/Navbar";
import SideDrawer from './header/sideDrawer/SideDrawer';
import Backdrop from "./header/backdrop/Backdrop";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import Sidebar from "./sidebar/Sidebar";

const {useState} = require("react");

const Admin = ()=>{
    const [state, setState]=useState(false);

    const drawerToggleClickHandler = () => {
        setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen}
        });
    };

    const backdropClickHandler = () => {
        setState({ sideDrawerOpen: false })
    }
    let backdrop
    let sideDrawer

    if (state.sideDrawerOpen) {
        backdrop = <Backdrop click={backdropClickHandler} />
    }


        return (
            <div>
                <div style={{height: '100%'}}>
                    <Navbar drawerClickHandler={drawerToggleClickHandler}/>
                    <SideDrawer show={state.sideDrawerOpen}/>
                    {backdrop}
                </div>
                <Sidebar/>
            </div>

        );
}

export default (Admin);

