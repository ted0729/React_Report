import React from 'react';

function AddButton({ onClickHandler }) {
  return (
    <button className="addButton" onClick={onClickHandler}>
      추가하기
    </button>
  );
}

export default AddButton;
