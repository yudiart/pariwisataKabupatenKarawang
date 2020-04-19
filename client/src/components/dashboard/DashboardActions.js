import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-villa" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"/> Edit Villa
      </Link>
      <Link to="/add-room" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"/> Add Room
      </Link>
    </div>
  );
};

export default DashboardActions;
