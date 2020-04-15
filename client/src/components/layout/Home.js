import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import {Row, Col} from "react-bootstrap";
import { Dropdown } from 'semantic-ui-react';

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
const Home = () => {  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="jumbotron bg-gradient text-light" style={{borderRadius:'0px'}}>
          <div className="container">
            <h1 className="x-large">Pariwisata KAB.Karawang</h1>
            <p className="lead">Untuk memenuhi tugas akhir skripsi.</p>
            <div className="buttons">
            </div>
          </div>
        </div>
        <Container>
          <Row>
            <Col lg={3}>
              <div className="jumbotron _1uz2h">
                <button type='button' className='btn btn-block'><i className='mdi mdi-account text-primary'/> Account</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-home-modern text-primary'/> Villa</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-food text-primary'/> Eat & Food</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-church text-primary'/> Budaya</button>
                <button type='button' className='btn btn-block'><i className='mdi mdi-yeast text-primary'/>Product Lokal</button>
              </div>
            </Col>
            <Col lg={9}>
              <div className="jumbotron _1uz2h">
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
                <div className="jumbotron-fluid">
                  <div className="jumbotron _1uz2h">
                    <button type='button' className='btn btn-block'><i className='mdi mdi-account text-primary'/> Account</button>
                    <button type='button' className='btn btn-block'><i className='mdi mdi-home-modern text-primary'/> Villa</button>
                    <button type='button' className='btn btn-block'><i className='mdi mdi-food text-primary'/> Eat & Food</button>
                    <button type='button' className='btn btn-block'><i className='mdi mdi-church text-primary'/> Budaya</button>
                    <button type='button' className='btn btn-block'><i className='mdi mdi-yeast text-primary'/>Product Lokal</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
