import React from "react";
import PropTypes from 'prop-types';
import {getStatusColors} from "../utils";

const Placeholder = ({text, status}) => (
  <div
    className={`card ${getStatusColors(status)} pr-5 pl-5`}
  >
    {text}
  </div>
);

Placeholder.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default Placeholder;
