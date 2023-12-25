import React, { useState, useEffect } from 'react';
import { addSubCategory, getAllCategories } from '../../services/userApi';

const Modal = ({ isOpen, onClose, title ,getCategories}) => {
  const [subcategoryname, setSubcategoryname] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCategories();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubCategory({ subcategoryname, category: selectedCategoryId});
      console.log('Subcategory added successfully');
      getCategories();
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

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
              <label>Sub-Category name:</label>
              <input type="text" value={subcategoryname} onChange={(event) => setSubcategoryname(event.target.value)} />
            </div>
            <div>
              <label>Category:</label>
              <select value={selectedCategoryId} onChange={(event) => setSelectedCategoryId(event.target.value)}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
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
