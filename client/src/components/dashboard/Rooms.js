import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Rooms = ({ kamar:{image} }) => {
    //For each experience, return jsx
    const rooms = image.map(item => (
        <tr key={item.id}>
            <td>{item.roomName}</td>
            <td>{item.description}</td>
            <td>{item.harga}</td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Experience Credientials</h2>
            <div className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm"> Room Name</th>
                    <th className="hide-sm"> Description</th>
                    <th className="hide-sm"> Harga</th>
                    <th />
                </tr>
                </thead>
                <tbody>{rooms}</tbody>
            </div>
        </Fragment>
    );
};

Rooms.propTypes = {
    kamar: PropTypes.array.isRequired
};

export default connect(
    null,
    {  }
)(Rooms);
