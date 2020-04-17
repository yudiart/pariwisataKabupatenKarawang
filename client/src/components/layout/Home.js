import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import {Row, Col, Carousel} from "react-bootstrap";
import {Collapse, Button, CardBody, Card, UncontrolledCollapse} from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import {deleteAccount, getCurrentProfile, getProfileById} from "../../actions/profile";
import Spinner from "./Spinner";
import { logout } from "../../actions/auth";

const countryOptions = [
  { key: 'bs', value: 'bs', text: 'Banyusari' },
  { key: 'bj', value: 'bj', text: 'Batujaya' },
  { key: 'ca', value: 'ca', text: 'Ciampel' },
  { key: 'cb', value: 'cb', text: 'Cibuaya' },
  { key: 'cp', value: 'cp', text: 'Cikampek' },
  { key: 'ck', value: 'ck', text: 'Cilamaya Kulon' },
  { key: 'cw', value: 'cw', text: 'Cilamaya Wetan' },
  { key: 'cl', value: 'cl', text: 'Cilebar' },
  { key: 'js', value: 'js', text: 'Jatisari' },
  { key: 'jk', value: 'jk', text: 'Jayakerta' },
  { key: 'kbt', value: 'kbt', text: 'Karawang Barat' },
  { key: 'ktr', value: 'ktr', text: 'Karawang Timur' },
  { key: 'k', value: 'k', text: 'Klari' },
  { key: 'kb', value: 'kb', text: 'Kota Baru' },
  { key: 'kw', value: 'kw', text: 'Kutawaluya' },
  { key: 'la', value: 'la', text: 'Lemahabang' },
  { key: 'pj', value: 'pj', text: 'Pakisjaya' },
  { key: 'pk', value: 'pk', text: 'Pangkalan' },
  { key: 'p', value: 'p', text: 'Pedes' },
  { key: 'ps', value: 'ps', text: 'Purwasari' },
  { key: 'rm', value: 'rm', text: 'Rawamerta' },
  { key: 'rd', value: 'rd', text: 'Rengasdengklok' },
  { key: 'tw', value: 'tw', text: 'Tegalwaru' },
  { key: 'ts', value: 'ts', text: 'Talagasari' },
  { key: 'tjb', value: 'tjb', text: 'Telukjambe Barat' },
  { key: 'tjt', value: 'tjt', text: 'Telukjambe Timur' },
  { key: 't', value: 't', text: 'Tempuran' },
  { key: 'tj', value: 'tj', text: 'Tirtajaya' },
  { key: 'tm', value: 'tm', text: 'Tirtamulya' }
];
const Home = ({
    logout,
    getCurrentProfile,
    auth: { isAuthenticated, user },
    profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [collapse, setCollapse] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [status, setStatus] = useState('Closed');

  const onEntering = () => setStatus('Opening...');

  const onEntered = () => setStatus('Opened');

  const onExiting = () => setStatus('Closing...');

  const onExited = () => setStatus('Closed');

  const toggle = () => setCollapse(!collapse);
  const toggle2 = () => setCollapse2(!collapse2);
  const authLinks = (
      <div>
        <a onClick={toggle} className='nav-link'><button type='button' className='btn btn-block'><i className='mdi mdi-account text-primary'/>Account</button></a>
        <Collapse
            isOpen={collapse}
            onEntering={onEntering}
            onEntered={onEntered}
            onExiting={onExiting}
            onExited={onExited}
        >
          <Card style={{border:'none',background:'transparent'}}>
            <CardBody>
              <Link to={'/dashboard'} className='nav-link'><i className='fas fa-tachometer-alt text-primary'/> Dashboard</Link>
              <div className='dropdown-divider' />
              <a id="toggler" className='nav-link mb-1'><button type='button' className='btn btn-block'><i className='mdi mdi-chevron-right'/>Pemesanan</button></a>
              <UncontrolledCollapse toggler="#toggler">
                <Card style={{border:'none',background:'transparent'}}>
                  <CardBody>
                    <button type='button' className='btn btn-block' style={{fontSize:'12px'}}>Menunggu Pembayaran</button>
                    <button type='button' className='btn btn-block' style={{fontSize:'12px'}}>Daftar Transaksi</button>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
              <div className='dropdown-divider' />
              <button type='button' className='btn btn-block'><i className='mdi mdi-settings text-primary'/>Setting</button>
              <button type='button' onClick={logout} className='btn btn-block' style={{cursor:'pointer'}}><i className="fas fa-sign-out-alt text-danger"/>Logout</button>
            </CardBody>
          </Card>
        </Collapse>
        <div className='dropdown-divider' />
      </div>


  );

  const guestLinks = (
      <div/>
  );
  return (
    <section className="landing">
      <div className="dark-overlay ">
        <div className="jumbotron bg-gradient text-light header-jumbotron" style={{borderRadius:'0px',minHeight:'250px'}}>
          <div className="container">
            <h1 className="large font-weight-bold" style={{fontFamily:"arial",fontSize:'200%'}}>Pariwisata KAB.Karawang</h1>
            <p className="lead">Untuk memenuhi tugas akhir skripsi.</p>
            <h3 className={'btn btn-danger'}>WEBSITE SEDANG DI KERJAKAN</h3>
          </div>
      </div>
        <Container>
          <Row>
            <Col lg={3}>
              <div className="jumbotron-fluid _1uz2h">
                {!loading && (
                    <div>{isAuthenticated ? authLinks : guestLinks}</div>
                )}

                <button type='button' className='btn btn-block'><i className='mdi mdi-home-modern text-primary'/> Villa</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-food text-primary'/> Eat & Food</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-church text-primary'/> Budaya</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-yeast text-primary'/>Product Lokal</button>
              </div>
            </Col>
            <Col lg={9}>
              <div className="_1uz2h">
                <div className="title mt-2 mb-4">
                  <h2><i className='mdi mdi-magnify'/>Lokasi Pariwisata</h2>
                </div>
                <>
                  <Dropdown
                      clearable
                      fluid
                      multiple
                      search
                      selection
                      options={countryOptions}
                      placeholder='Select Kecamatan'/>
                </>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
      
  );
};

Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile,logout }
)(Home);
