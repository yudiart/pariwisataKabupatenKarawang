import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {Nav, NavDropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";

const Customers = ({
    auth:{user}
})=>{
    return (
        <Fragment>
            <Nav className="mr-auto ml-auto">
                {user && 'customer' === user.role?(
                    <>
                        <Link to="/about" className='nav-link'>About</Link>
                        <NavDropdown title="Article" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Promo</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Villa</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </>
                ):(<></>)}
            </Nav>
        </Fragment>
    )
}

Customers.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout})(Customers);