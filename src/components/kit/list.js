import React from "react";
import PropTypes from 'prop-types';

const KitListC = ({id, handleUpdate, wheel, handleRemove}) => (
  <div
    className='d-flex flex-column card m-3'
  >
    <div
      className='cursor-pointer d-flex flex-column align-items-center'
      onClick={() => handleUpdate(id)}
    >
      <div>{wheel.name}</div>
      <div className='mt-2'>{wheel.description}</div>
      <div className='mt-2'>{`${wheel.price} $`}</div>
      <div
        className='mt-2 bg-img'
        style={{
          backgroundImage: `url(${wheel.preview})`,
          width: 100, height: 100
        }}
      />
    </div>
    <button
      onClick={() => handleRemove(id)}
      className='btn-danger mt-2'
    >
      remove
    </button>
  </div>
);

KitListC.propTypes = {
  id: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  wheel: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default KitListC;
