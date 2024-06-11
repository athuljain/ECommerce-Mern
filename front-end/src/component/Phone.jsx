import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";

const Phone = () => {
  const { products, setProducts } = useContext(myContext);
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    fetchPhoneProducts();
  }, []);

  const fetchPhoneProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/products/category/phone",
        {
          withCredentials: true,
        }
      );

      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id),
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching phone products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartAction = async (product) => {
    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const updatedCartItems = [...cartItems, productId];
        setCartItems(updatedCartItems);

        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inCart: true } : product
        );
        setProducts(updatedProducts);
        alert("Product added to cart successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Product already in cart");
      } else {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });

      const updatedCartItems = cartItems.filter(item => item !== productId);
      setCartItems(updatedCartItems);

      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);
      alert("Product removed from cart successfully");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="container">
      <div className="sub-Container">
        <h1 className="Phone-Head">Phone Products</h1>
      </div>
      <div className="PhoneMainBody">
        <h2 className="bodyHead">Phone List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bodyinner" style={{ display: "flex" }}>
            {products.map((product) => (
              <div className="body-card" key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt="img" />
                </Link>
                <h4>{product.title}</h4>
                <h5>{product.description}</h5>
                <h4>{product.price}</h4>
                <button
                  onClick={() => handleCartAction(product)}
                >
                  {product.inCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Phone;



