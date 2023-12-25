import { userAxiosInstence } from "../utils/axios-utils";

const userSignup = (value) => {
    return userAxiosInstence.post('/register', value, {
      withCredentials:true
    })
  }

  const userLogin = (value) => {
    return userAxiosInstence.post('/login', value, {
        withCredentials:true
    })
};

const isUserAuth = () => {
    return userAxiosInstence.get("/userAuth", { withCredentials: true });
  };

const fetchAllProducts = () => {
    return userAxiosInstence.get('/products', {
      withCredentials: true,
    });
  };
  
  const addProduct = (productData) => {

    return userAxiosInstence.post('/addProduct',productData,{
      withCredentials: true,
    });
  };
  
  const addCategory = (data) => {
    return userAxiosInstence.post('/addCategory', data, {
      withCredentials:true
    })
  }

  const getAllCategories = () => {
    return userAxiosInstence.get('/categories', {
      withCredentials:true
    })
  }

  const addSubCategory = (data) => {
    return userAxiosInstence.post('/addSubCategory', data, {
      withCredentials: true
    })
  };

  const getAllSubCategories = () => {
    return userAxiosInstence.get('/subcategories', {
      withCredentials:true
    })
  }

  const productDetails = (id) => {
    return userAxiosInstence.get(`productDetails/${id}`, {
      withCredentials: true
    })
  }

export {
    userSignup,
    userLogin,
    isUserAuth,
    fetchAllProducts,
    addProduct,
    addCategory,
    getAllCategories,
    addSubCategory,
    getAllSubCategories,
    productDetails
};