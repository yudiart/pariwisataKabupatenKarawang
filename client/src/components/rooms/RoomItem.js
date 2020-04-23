import React  from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addWishlist, removeWishlist, deleteRoom } from "../../actions/room";

const RoomItem = () => (
    <div className="post bg-white p-1 my-1">
        <div>
            <div className="col-lg-12">
                <div className="col-lg-4">
                    <div className='card' style={{ width: '18rem' }} >
                        <div style={{display:'flex',width:'18rem',height:'150px',overflowX:'auto',overflowY:"hidden",borderRadius:'5px',background:'#FAFAFA',paddingTop:'10px'}}>
                        </div>
                        <div className='card-body'>
                            <div className='card-title'>title</div>
                            <div className='card-text' style={{textAlign: 'justify'}}>Text</div>
                            <button className='btn btn-primary'>Go somewhere</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

RoomItem.defaultProps = {
    showActions: true
};

RoomItem.propTypes = {
    addWishlist: PropTypes.func.isRequired,
    removeWishlist: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    rooms: state.rooms
});

export default connect(
    mapStateToProps,
    { addWishlist, removeWishlist, deleteRoom }
)(RoomItem);
