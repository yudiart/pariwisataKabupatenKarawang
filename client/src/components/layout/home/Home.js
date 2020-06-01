import React, {Fragment, useEffect} from "react";
import Footer from "../footer/Footer";
import {Card, Col, Container, Row} from "react-bootstrap";
import HomeLanding from "./HomeLanding";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import {getVillas} from "../../../actions/villa";
import {getAllRooms} from "../../../actions/room";
import Navbar from "../navbar/Navbar";
import Spinner from "../Spinner";

//style
import './style/style.css';

import HomePortofolio from "./child/HomePortofolio";


const Home = ({
    getAllRooms,
    room:{rooms,loading},
    auth,

})=>{
useEffect(() => {
    getAllRooms();
}, [getAllRooms]);
  return (
      loading || rooms.loading === true ? <Spinner/> :
          auth && auth.loading === true ? <Spinner/> :
          <Fragment>
              <Navbar/>
              <div>
                  <HomeLanding/>
                  <HomePortofolio/>
              </div>
              <section>
                  <Footer/>
              </section>
          </Fragment>

  );
};
Home.propTypes ={
    getAllRooms: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({

    room: state.room
});
export default connect(mapStateToProps,{getAllRooms})(Home);