import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productDetails } from "../services/userApi";
import Resizer from 'react-image-file-resizer';

const ProductDetails = () => {
    const [productData, setProductData] = useState({});
    const { id } = useParams();

    const fetchProductData = async (id) => {
        try {
            const res = await productDetails(id);
            setProductData(res.data.product);
        } catch (error) {
            console.log(error.message);
        }
    };

    

    useEffect(() => {
        fetchProductData(id);
    }, [id]);

    return (
        <div className="product-details-container">
            <div className="product-details-header">
                <h1>{productData.title}</h1>
            </div>
            <div className="product-details-content">
                <div className="product-details-image">
                    {productData.images && productData.images.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${index}`} />
                    ))}
                </div>
                <div className="product-details-info">
                    <h2>Price: ₹{productData.price}</h2>
                    <h2>RAM: {productData.ram}</h2>
                    <h2>Subcategory: {productData.subcategory}</h2>
                    <h2>Description: {productData.description}</h2>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

