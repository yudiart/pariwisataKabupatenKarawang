import React, {useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getAllUsers, getAllCustomers, getAllVillas, getAllRooms} from "../../../actions/admin";
import {Card, Col, Row} from "react-bootstrap";

import Spinner2 from "../../layout/Spinner2";

const Admin = ({
    getAllUsers,
    getAllVillas,
    getAllCustomers,
    getAllRooms,
    admin:{
        users,
        villas,
        customers,
        rooms,
        loading
    }

}) => {
    useEffect(()=>{
        getAllUsers();
        getAllRooms();
        getAllCustomers();
        getAllVillas();
},[getAllUsers,getAllCustomers,getAllRooms,getAllVillas]);

    //NumRows Users ========================
    const user = users.map(key => key._id)
    const numRows = user.length;
    //======================================
    //NumVilla Villa ========================
    const villa = villas.map(key => key._id)
    const numVilla = villa.length;
    //======================================
    //NumCus Customers ====================
    const customer = customers.map(key => key._id)
    const numCus = customer.length;
    //======================================
    //NumRooms Customers ====================
    const room = rooms.map(key => key._id)
    const numRooms = room.length;
    //======================================
    return (
        <div className="dash-buttons">
           <Row>
               <Col lg={3}>
                   <div className="jumbotron-fluid text-center bg-primary text-white _1uz2h" style={{borderRadius:'5px'}}>
                       <h5>Total Users</h5>
                       <h3>{loading? <Spinner2/>:(
                           <>
                           {numRows}
                           </>
                       )}
                       </h3>
                   </div>
               </Col>
               <Col lg={3}>
                   <div className="jumbotron-fluid text-center bg-success text-white _1uz2h" style={{borderRadius:'5px'}}>
                       <h5>Total Villa</h5>
                       <h3>{loading? <Spinner2/>:(
                           <>
                               {numVilla}
                           </>
                       )}
                       </h3>
                   </div>
               </Col>
               <Col lg={3}>
                   <div className="jumbotron-fluid text-center bg-warning text-white _1uz2h" style={{borderRadius:'5px'}}>
                       <h5>Total Villa</h5>
                       <h3>{loading? <Spinner2/>:(
                           <>
                               {numCus}
                           </>
                       )}
                       </h3>
                   </div>
               </Col>
               <Col lg={3}>
                   <div className="jumbotron-fluid text-center bg-warning text-white _1uz2h" style={{borderRadius:'5px'}}>
                       <h5>Total Room</h5>
                       <h3>{loading? <Spinner2/>:(
                           <>
                               {numRooms}
                           </>
                       )}
                       </h3>
                   </div>
               </Col>
           </Row>
        </div>
    );
};
Admin.propTypes ={
    getAllUsers: PropTypes.func.isRequired,
    getAllCustomers: PropTypes.func.isRequired,
    getAllVillas: PropTypes.func.isRequired,
    getAllRooms: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    alert: state.alert,
    villa: state.villa,
    admin: state.admin,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {getAllUsers,getAllCustomers,getAllVillas,getAllRooms}
)(Admin);

