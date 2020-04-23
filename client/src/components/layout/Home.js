import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import {Row, Col} from "react-bootstrap";
import {Collapse, CardBody, Card, UncontrolledCollapse} from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import {getCurrentProfile, getProfileById} from "../../actions/profile";
import { getCurrentVilla } from "../../actions/villa";
import Spinner from "./Spinner";
import { logout } from "../../actions/auth";

const countryOptions = [
  { key: '1', value: 'Banyusari', text: 'Banyusari' },
  { key: '2', value: 'Batujaya', text: 'Batujaya' },
  { key: '3', value: 'Ciampel', text: 'Ciampel' },
  { key: '4', value: 'Cibuaya', text: 'Cibuaya' },
  { key: '5', value: 'Cikampek', text: 'Cikampek' },
  { key: '6', value: 'Cilamaya Kulon', text: 'Cilamaya Kulon' },
  { key: '7', value: 'Cilamaya Wetan', text: 'Cilamaya Wetan' },
  { key: '8', value: 'Cilebar', text: 'Cilebar' },
  { key: '9', value: 'Jatisari', text: 'Jatisari' },
  { key: '10', value: 'Jayakerta', text: 'Jayakerta' },
  { key: '11', value: 'Karawang Barat', text: 'Karawang Barat' },
  { key: '12', value: 'Karawang Timur', text: 'Karawang Timur' },
  { key: '13', value: 'Klari', text: 'Klari' },
  { key: '14', value: 'Kota Baru', text: 'Kota Baru' },
  { key: '15', value: 'Kutawaluya', text: 'Kutawaluya' },
  { key: '16', value: 'Lemahabang', text: 'Lemahabang' },
  { key: '17', value: 'Pakisjaya', text: 'Pakisjaya' },
  { key: '18', value: 'Pangkalan', text: 'Pangkalan' },
  { key: '19', value: 'Pedes', text: 'Pedes' },
  { key: '20', value: 'Purwasari', text: 'Purwasari' },
  { key: '21', value: 'Rawamerta', text: 'Rawamerta' },
  { key: '22', value: 'Rengasdengklok', text: 'Rengasdengklok' },
  { key: '23', value: 'Tegalwaru', text: 'Tegalwaru' },
  { key: '24', value: 'Talagasari', text: 'Talagasari' },
  { key: '25', value: 'Telukjambe Barat', text: 'Telukjambe Barat' },
  { key: '26', value: 'Telukjambe Timur', text: 'Telukjambe Timur' },
  { key: '27', value: 'Tempuran', text: 'Tempuran' },
  { key: '28', value: 'Tirtajaya', text: 'Tirtajaya' },
  { key: '29', value: 'Tirtamulya', text: 'Tirtamulya' }
];
const Home = ({
    logout,
    getCurrentProfile,
    auth: { isAuthenticated, user},
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
              <button type='button' className='btn btn-block'><i className='mdi mdi-settings text-primary'/>{' '}Setting</button>
              <div className='dropdown-divider mt-1' />
              <Link to={'/login'} onClick={logout} className='nav-link' style={{cursor:'pointer'}}><i className="fas fa-sign-out-alt text-danger"/>{' '}Logout</Link>
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
                    <div>{isAuthenticated  && user && user.role === 'customer'? authLinks : guestLinks}</div>
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
