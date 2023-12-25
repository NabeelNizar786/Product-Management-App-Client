import React, { useState } from 'react';
import { addCategory } from '../../services/userApi';

const Modal = ({ isOpen, onClose, title,getCategories}) => {

  const [categoryname, setCategoryname,]  = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // console.log(categoryname);
      await addCategory({categoryname}).
      then((res) => {
        console.log(res.data.message);
          getCategories();
          onClose();
      })
    } catch (error) {
      
    }
  }

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit}>
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <span className="modalTitle">{title}</span>
          <button className="closeButton" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modalBody">
          <div>
            <label>Category Name:</label>
            <input type="text" name='categoryname' value={categoryname} onChange={(event) => setCategoryname(event.target.value)}/>
          </div>
          <button className="submitProButton" type="submit">
            ADD
          </button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default Modal;
