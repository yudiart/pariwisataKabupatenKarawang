import React, { Fragment } from "react";
import spinner from "./SpinnerInterwind.gif";

export default () => (
  <Fragment>
    <img className='align-middle'
      src={spinner}
      style={{ width: "100px", margin: "auto", display: "block",position: 'absolute', left: '50%',top: '50%'}}
      alt='Loading...'
    />
  </Fragment>
);
