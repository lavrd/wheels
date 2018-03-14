import React from "react";
import PropTypes from 'prop-types';

const KitNewC = ({state, handleSubmit, handleChange, disabled, isUpdate, handleDefault}) => (
  <form
    className='d-flex flex-column align-items-center'
    onSubmit={handleSubmit}
  >
    <input
      name='name'
      value={state.name}
      placeholder='name'
      onChange={handleChange}
    />
    <input
      name='description'
      value={state.description}
      placeholder='description'
      onChange={handleChange}
    />
    <input
      name='price'
      type='number'
      value={state.price}
      placeholder='price'
      onChange={handleChange}
    />
    <input
      name='model'
      type='file'
      onChange={handleChange}
    />
    <label>model</label>
    <input
      name='preview'
      type='file'
      onChange={handleChange}
    />
    <label>preview image</label>
    <div className='d-flex mt-3'>
      <button
        type='submit'
        className='btn-primary'
        disabled={disabled}
      >
        {isUpdate ? 'update' : 'add'}
      </button>
      <button
        className='btn-primary'
        onClick={handleDefault}
      >
        default
      </button>
    </div>
  </form>
);

KitNewC.propTypes = {
  state: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  handleDefault: PropTypes.func.isRequired
};

export default KitNewC;
