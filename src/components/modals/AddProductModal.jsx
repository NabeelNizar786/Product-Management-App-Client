import React, { useState } from "react";
import { addProduct } from "../../services/userApi";

const Modal = ({ isOpen, onClose, title, fetchProducts, categories, subcategories }) => {
  const [titles, setTitle] = useState("");
  const [ram, setRam] = useState("");
  const [price, setPrice] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    // Update the state with preview images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const removeImage = (index) => {
    // Remove the selected image and its preview
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(titles, ram, price, totalProducts, description, images);
      // Create a FormData object to handle file uploads
      const formData = new FormData();

      // Append non-file fields
      formData.append("title", titles);
      formData.append("ram", ram);
      formData.append("price", price);
      formData.append("category", selectedCategory);
      formData.append("subcategory", selectedSubCategory);
      formData.append("totalProducts", totalProducts);
      formData.append("description", description);

      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      console.log(formData.get("images"));

      // Make the API call to add the product
      await addProduct(formData)
        .then((res) => {
          console.log(res.data.message);
          fetchProducts();
          onClose();
        })
        .catch((error) => {
          console.log(error);
        });

      // Optionally, you can perform additional actions after adding the product
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <label>Title:</label>
              <input
                type="text"
                name="titles"
                value={titles}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            {/* RAM Input */}
            <div>
              <label htmlFor="ram">RAM:</label>
              <input
                type="text"
                name="ram"
                value={ram}
                onChange={(event) => setRam(event.target.value)}
              />
            </div>

            {/* Price Input */}
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div>
              <label>Category:</label>
              <select
                name="category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryname}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Sub-Category:</label>
              <select
                name="subcategory"
                value={selectedSubCategory}
                onChange={(event) => setSelectedSubCategory(event.target.value)}
              >
                <option value="" disabled>
                  Select a Sub-category
                </option>
                {subcategories.map((subcategory) => (
                  console.log(subcategory),
                  <option key={subcategory._id} value={subcategory.subcategoryname}>
                    {subcategory.subcategoryname}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Products Input */}
            <div>
              <label>Total Products:</label>
              <input
                type="number"
                name="totalProducts"
                value={totalProducts}
                onChange={(event) => setTotalProducts(event.target.value)}
              />
            </div>

            {/* Description Input */}
            <div>
              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            {/* Multiple Image Upload Input */}
            <div className="imageUploadContainer">
              <label className="uploadLabel">Upload Images:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>

            {/* Image Previews */}
            <div className="imagePreviewContainer">
              {previewImages.map((preview, index) => (
                <div key={index} className="imagePreviewItem">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="imagePreview"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="removeButton"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button className="submitProButton" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
