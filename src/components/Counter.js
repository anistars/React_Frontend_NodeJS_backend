import React from 'react';

const Counter = ({ count, handleIncrement, handleDecrement }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-danger" onClick={handleDecrement}><span className="bi-trash"></span></button>
      <button type="button" className="btn btn-secondary">
        {count}
      </button>
      <button type="button" className="btn btn-primary" onClick={handleIncrement}><span className="bi-plus-square-fill"></span></button>
    </div>
  );
};

export default Counter;
