import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {Dropdown} from "semantic-ui-react";
import {Card, CardBody, Collapse, UncontrolledCollapse} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../../actions/profile";
import {logout} from "../../../actions/auth";


const countryOptions = [
    { id: '1', value: 'Banyusari', text: 'Banyusari' },
    { id: '2', value: 'Batujaya', text: 'Batujaya' },
    { id: '3', value: 'Ciampel', text: 'Ciampel' },
    { id: '4', value: 'Cibuaya', text: 'Cibuaya' },
    { id: '5', value: 'Cikampek', text: 'Cikampek' },
    { id: '6', value: 'Cilamaya Kulon', text: 'Cilamaya Kulon' },
    { id: '7', value: 'Cilamaya Wetan', text: 'Cilamaya Wetan' },
    { id: '8', value: 'Cilebar', text: 'Cilebar' },
    { id: '9', value: 'Jatisari', text: 'Jatisari' },
    { id: '10', value: 'Jayakerta', text: 'Jayakerta' },
    { id: '11', value: 'Karawang Barat', text: 'Karawang Barat' },
    { id: '12', value: 'Karawang Timur', text: 'Karawang Timur' },
    { id: '13', value: 'Klari', text: 'Klari' },
    { id: '14', value: 'Kota Baru', text: 'Kota Baru' },
    { id: '15', value: 'Kutawaluya', text: 'Kutawaluya' },
    { id: '16', value: 'Lemahabang', text: 'Lemahabang' },
    { id: '17', value: 'Pakisjaya', text: 'Pakisjaya' },
    { id: '18', value: 'Pangkalan', text: 'Pangkalan' },
    { id: '19', value: 'Pedes', text: 'Pedes' },
    { id: '20', value: 'Purwasari', text: 'Purwasari' },
    { id: '21', value: 'Rawamerta', text: 'Rawamerta' },
    { id: '22', value: 'Rengasdengklok', text: 'Rengasdengklok' },
    { id: '23', value: 'Tegalwaru', text: 'Tegalwaru' },
    { id: '24', value: 'Talagasari', text: 'Talagasari' },
    { id: '25', value: 'Telukjambe Barat', text: 'Telukjambe Barat' },
    { id: '26', value: 'Telukjambe Timur', text: 'Telukjambe Timur' },
    { id: '27', value: 'Tempuran', text: 'Tempuran' },
    { id: '28', value: 'Tirtajaya', text: 'Tirtajaya' },
    { id: '29', value: 'Tirtamulya', text: 'Tirtamulya' }
];
const HomeSearch = () => {
    const [displayVilla, toggleVilla] = useState(0);
    const [displayPariwisata, togglePariwisata] = useState(0);
    return(
            <div className=' form-home _1uz2h bg-white shadow' >
            <Row>
                <Col lg={3}>
                    <div className="bt_menu_left">
                        <button
                            type='button'
                            className='btn btn-block'
                            onClick={
                                ()=>toggleVilla(0)|| togglePariwisata(1)}
                        >
                            <i className='mdi mdi-food text-primary'/> Pariwisata
                        </button>
                        <button
                            type='button'
                            className='btn btn-block'
                            onClick={
                                ()=>toggleVilla(1)|| togglePariwisata(0)}
                        >
                            <i className='mdi mdi-home-modern text-primary'/> Villa
                        </button>

                        <button
                            type='button'
                            className='btn btn-block'>
                            <i className='mdi mdi-church text-primary'/> Budaya
                        </button>
                        <button
                            type='button'
                            className='btn btn-block'>
                            <i className='mdi mdi-yeast text-primary'/>Product Lokal
                        </button>
                    </div>
                </Col>
                <Col lg={9}>
                    <div>
                        {displayVilla ? (
                            <div className="_1uz2h">
                                <div className="title mt-2 mb-4">
                                    <h2><i className='mdi mdi-magnify'/>Lokasi Villa</h2>
                                </div>
                                <>
                                    <Dropdown
                                        clearable
                                        fluid
                                        multiple
                                        search
                                        selection
                                        options={countryOptions}
                                        placeholder='Select Kecamatan'
                                    />
                                </>
                            </div>
                        ):<div className="_1uz2h">
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
                                    placeholder='Select Kecamatan'
                                />
                            </>
                        </div>}


                    </div>
                </Col>
            </Row>
        </div>
    )
}
HomeSearch.propTypes = {
};

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {}
)(HomeSearch);