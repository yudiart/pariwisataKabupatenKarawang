import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createVillaProfile } from "../../../actions/villa";
import {TextArea} from "semantic-ui-react";

const CreateVillaProfile = ({ createVillaProfile, history }) => {
    const [formData, setFormData] = useState({
        kecamatan: "",
        kelurahan: "",
        postcode: "",
        jalan: "",
        kampung: "",
        blok: "",
        rt: "",
        rw: "",
        no: "",
        contact: "",
        bio: "",
        twitter: "",
        facebook: "",
        youtube: "",
        instagram: ""
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const [displayBlockInput,toggleBlockInput,] = useState(false);

    const {
        kecamatan,
        kelurahan,
        postcode,
        jalan,
        kampung,
        blok,
        rt,
        rw,
        no,
        contact,
        bio,
        twitter,
        facebook,
        youtube,
        instagram
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createVillaProfile(formData, history);
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Create Your Villa Profile</h1>
            <p className="lead">
                <i className="fas fa-user"/> Let's get some information to make your
                profile stand out
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <Fragment>
                    <div className='form-row mb-4'>
                        <h4>Bio <span style={{color:'red'}}>*</span></h4>
                        <div className='col-md-12'>
                            <TextArea
                                placeholder="A short bio of yourself"
                                name="bio"
                                style={{borderRadius:'10px'}}
                                className='col-lg-8'
                                value={bio}
                                onChange={e => onChange(e)}/>
                        </div>
                    </div>
                    <div className='mb-4'>
                        {/*row1*/}
                        <h4>Location <span style={{color:'red'}}>*</span></h4>
                        <div className='dropdown-divider col-lg-8'/>
                        <div className='form-row'>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    Kecamatan :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='kecamatan'
                                       value={kecamatan}
                                       placeholder='e.g Karawang Barat'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    Kelurahan :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='kelurahan'
                                       value={kelurahan}
                                       placeholder='e.g Tanjung Pura'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                        {/*row2*/}
                        <div className='form-row mt-2'>
                            <div className='col-md-8'>
                                <small className="form-text">
                                    Nama Jalan :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='jalan'
                                       value={jalan}
                                       placeholder='e.g Jl.rhs. saca kusuma'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                        {/*row3*/}
                        <div className='form-row mt-2'>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    Kampung :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='kampung'
                                       value={kampung}
                                       placeholder=' e.g Jatirasa'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                        <div className="my-2">
                            <button
                                onClick={() => toggleBlockInput(!displayBlockInput)}
                                type="button"
                                className="btn btn-light">
                                Add Blok
                            </button>
                            <span>Optional</span>
                        </div>
                        {displayBlockInput && (
                            <div className='form-row mt-2'>
                                <div className='col-md-4'>
                                    <small className="form-text">
                                        Blok :
                                    </small>
                                    <input type="text"
                                           className='form-control'
                                           name='blok'
                                           value={blok}
                                           placeholder='e.g A1'
                                           onChange={e => onChange(e)}
                                    />
                                </div>
                            </div>
                        )}
                        {/*row4*/}
                        <div className='form-row mt-2'>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    RT :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='rt'
                                       value={rt}
                                       placeholder='e.g 001'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    RW :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='rw'
                                       value={rw}
                                       placeholder='e.g 014'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                        {/*row4*/}
                        <div className='form-row mt-2'>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    No Villa :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='no'
                                       value={no}
                                       placeholder='e.g 123'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    Pos Code :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='postcode'
                                       value={postcode}
                                       placeholder='e.g 413**'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>

                <Fragment>
                    {/*row1*/}
                    <div className={'mt-2'}>
                        <h4>Contact <span style={{color:'red'}}>*</span></h4>
                        <div className='dropdown-divider col-lg-8'/>
                        <div className='form-row'>
                            <div className='col-md-4'>
                                <small className="form-text">
                                    No Telephone :
                                </small>
                                <input type="text"
                                       className='form-control'
                                       name='contact'
                                       value={contact}
                                       placeholder='e.g 08123456****'
                                       onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>

                <div className="my-2 mt-4">
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn-light">
                        Add Social Network
                    </button>
                    <span>Optional</span>
                </div>
                <div className="dropdown-divider"/>
                {displaySocialInputs && (
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"/>
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={twitter}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"/>
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"/>
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"/>
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={e => onChange(e)}
                            />
                        </div>
                    </Fragment>
                )}
                <div className="mt-4"/>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

CreateVillaProfile.propTypes = {
    createVillaProfile: PropTypes.func.isRequired
};

export default connect(
    null,
    { createVillaProfile }
)(withRouter(CreateVillaProfile));
