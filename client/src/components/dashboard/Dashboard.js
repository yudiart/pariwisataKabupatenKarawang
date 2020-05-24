import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SideBar from "./sidebar/SideBar";

const Dashboard = ({auth:{loading}}) => {

  return loading  ? (
    <Spinner />
  ) : (
    <Fragment>
      <SideBar/>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
