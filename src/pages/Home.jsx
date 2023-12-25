import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import AddProductModal from "../components/modals/AddProductModal";
import CategoryModal from "../components/modals/CategoryModal";
import SubcategoryModal from "../components/modals/SubcategoryModal";
import Product from "../components/Products";
import Notification from '../components/Notification';
import {
  fetchAllProducts,
  getAllCategories,
  getAllSubCategories,
} from "../services/userApi";
import Pagination from "../components/Pagination";
import WishlistMenu from "../components/Wishlist";

export const Home = () => {
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isAddSubcategoryModalOpen, setAddSubcategoryModalOpen] =
    useState(false);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isWishlistMenuOpen, setWishlistMenuOpen] = useState(false);
  const [subcats, setSubCats] = useState([]);

  const filteredDatas = products.filter((product) => {
    return subcats.length === 0 || subcats.includes(product.subcategory);
  });

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddCategory = () => {
    setAddCategoryModalOpen(true);
  };

  const handleAddSubCategory = () => {
    setAddSubcategoryModalOpen(true);
  };

  const handleAddProduct = () => {
    setAddProductModalOpen(true);
  };

  const handleCloseModals = () => {
    setAddCategoryModalOpen(false);
    setAddSubcategoryModalOpen(false);
    setAddProductModalOpen(false);
  };

  useEffect(() => {
    fetchProducts();
    getCategories();
    getSubcategories();
  }, []);

  const searchItems = (searchValue) => {
    console.log(searchValue);

    // Use the updated searchValue directly
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const filteredData = products.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase()); // Use searchValue here
      });

      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(products);
    }
  };





  const getCategories = async (e) => {
    try {
      await getAllCategories()
        .then((res) => {
          setCategories(res.data.categories);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSubcategories = async (e) => {
    try {
      await getAllSubCategories()
        .then((res) => {
          setSubcategory(res.data.subcategories);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetchAllProducts();
      console.log(response.data);
      // setProducts(response.data.products);
      setProducts((prevProducts) => response.data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const openWishlistMenu = () => {
    setWishlistMenuOpen(true);
  };

  const closeWishlistMenu = () => {
    setWishlistMenuOpen(false);
  };

  return (
    <div className="homeContainer">
      <Navbar searchItems={searchItems} openWishlistMenu={openWishlistMenu} />
      <Notification/>
      <Sidebar categories={categories} subcats={subcats} setSubCats={setSubCats}/>

      <div className="buttonContainer">
        <Button label="Add Category" onClick={handleAddCategory} />
        <Button label="Add Subcategory" onClick={handleAddSubCategory} />
        <Button label="Add Product" onClick={handleAddProduct} />
      </div>
      <WishlistMenu isOpen={isWishlistMenuOpen} onClose={closeWishlistMenu} />
      {/* Rendering list of products */}
      <div className="productsContainer">
        {searchInput.length > 0 ? (
          // Display filtered results if search input is present
          filteredResults && filteredResults.length > 0 ? (
            filteredResults.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                images={product.images}
              />
            ))
          ) : (
            <div className="emptyProductsMessage">
              No matching products found.
            </div>
          )
        ) : // Display all products if search input is empty
        currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              images={product.images}
              product={product}
            />
          ))
        ) : (
          <div className="emptyProductsMessage">No products available.</div>
        )}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={
          searchInput.length > 0
            ? filteredResults.length
            : filteredDatas.length > 0
            ? filteredDatas.length
            : products.length
        }
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <CategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={handleCloseModals}
        title="Add Category"
        getCategories={getCategories}
      />

      <SubcategoryModal
        isOpen={isAddSubcategoryModalOpen}
        onClose={handleCloseModals}
        title="Add Subcategory"
        getCategories={getCategories}
      />
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={handleCloseModals}
        fetchProducts={fetchProducts}
        categories={categories}
        subcategories={subcategories}
      />
    </div>
    
  );
};
