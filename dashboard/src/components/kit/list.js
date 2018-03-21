import React from "react";
import PropTypes from 'prop-types';

const WheelCard = ({id, handleUpdate, wheel, handleRemove}) => (
  <div
    className='d-flex flex-column card m-3'
  >
    <div className='d-flex flex-column align-items-center'>
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

    <div className='d-flex'>
      <button
        onClick={() => handleUpdate(id)}
        className='btn-primary mt-2'
      >
        update
      </button>

      <button
        onClick={() => handleRemove(id)}
        className='btn-danger mt-2'
      >
        remove
      </button>
    </div>
  </div>
);

WheelCard.propTypes = {
  id: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  wheel: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default WheelCard;
