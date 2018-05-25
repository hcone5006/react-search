import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group my-2">
    <div class="input-group">
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={text}
        value={value}
        onChange={handleChange}
        required
      />
      <div class="input-group-append">
        <input type="submit" value="Search" className="btn btn-primary"/>
      </div>
    </div>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;