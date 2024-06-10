

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css";

export default function Home() {
  const { products, setProducts, cartItems, setCartItems } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/getProducts",
        {
          withCredentials: true,
        }
      );
      const updatedProducts = response.data.allProducts.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id)
      }));
      
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [setProducts, cartItems]);

  useEffect(() => {
    fetchProducts();

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [fetchProducts]);


  const handleGetProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/user/products/category/${category}`,
        {
          withCredentials: true,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLaptopProducts = () => {
    handleGetProductsByCategory("laptop");
    nav(`/laptops`); 
  };

  const handleGetPhoneProducts = () => {
    handleGetProductsByCategory("phone");
    nav(`/phones`);
  };

  return (
    <div className="container">
      <div className="sub-Container">
        <Link to={"/cart"}>Cart</Link>
        <h1 className="Home-Head">Home Page</h1>
      </div>
      <div className="HomeMainBoady">
        <h2 className="bodyHead">Product List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bodyinner" style={{ display: "flex" }}>
            {products.map((product) => (
              <div className="body-card" key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img className="ProductImg" src={product.image} alt="img" />
                </Link>
                <h4 className="ProductTitle">{product.title}</h4>
                <h5 className="ProductDes">{product.description}</h5>
                <h4 className="ProductPrice">{product.price}</h4>
            
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="CategoryDiv">
        <button className="CategoryBtn" onClick={handleGetLaptopProducts}>Get Laptop Products</button>
        <button className="CategoryBtn" onClick={handleGetPhoneProducts}>Get Phone Products</button>
      </div>
    </div>
  );
}
