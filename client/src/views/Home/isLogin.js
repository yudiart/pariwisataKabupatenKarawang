import React from 'react';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import spinner from '../../assets/Spinner.gif';
import PropTypes from "prop-types";
import {connect} from "react-redux";
const isLogin =({isAuthenticated,history})=>{
    const loggedin = (
        setTimeout(() => {
            isAuthenticated ? history.push(`/`):null
        }, 3000)
    )
    return (
        loggedin ?
            <Box component="span" m={1}>
                <Paper elevation={0} >
                    <img
                        className='align-middle'
                        src={spinner}
                        style={{ width: "50px"}}
                        alt='Loading...'/>
                    <h1
                        className='align-middle'
                    >You are Logged in</h1>
                </Paper>
            </Box>
            :null
    )
}
isLogin.propTypes = {
    isAuthenticated: PropTypes.bool

};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    {}
)(isLog);