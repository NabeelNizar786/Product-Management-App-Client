import React, {  useState } from 'react';

const Sidebar = ({ categories, setSubCats }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleToggleCategory = (category) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(category)
        ? prevExpanded.filter((cat) => cat !== category)
        : [...prevExpanded, category]
    );
  };

  const handleToggleSubcategory = (subCategory) => {
    setSelectedSubcategories((prevSelected) =>
      prevSelected.includes(subCategory)
        ? prevSelected.filter((selected) => selected !== subCategory)
        : [...prevSelected, subCategory]
    );
    setSubCats((prevSubcats) => {
    const subcategoryName = subCategory.subcategoryname;
    const updatedSubcats = prevSubcats.includes(subcategoryName)
      ? prevSubcats.filter((item) => item !== subcategoryName)
      : [...prevSubcats, subcategoryName];

    // Log the updated subcats
    console.log("subcats:", updatedSubcats);
    return updatedSubcats;
  });
  };

  return (
    <div className="sidebar">
      <div className="categoriesHeading">Categories</div>
      {categories.map((category) => (
        <div key={category.categoryname} className="categoryDropdown">
          <div className="categoryName" onClick={() => handleToggleCategory(category.categoryname)}>
            {category.categoryname} {expandedCategories.includes(category.categoryname) ? '▼' : '►'}
          </div>
          {expandedCategories.includes(category.categoryname) && (
            <div className="subcategoryList">
              {category.subcategories.map((subCategory) => (
                <div key={subCategory.subcategoryname} className="subcategoryName">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subCategory)}
                      onChange={() => handleToggleSubcategory(subCategory)}
                    />
                    {subCategory.subcategoryname}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;