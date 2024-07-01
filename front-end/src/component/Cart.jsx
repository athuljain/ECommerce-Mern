


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Cart.css";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/user/cart", {
          withCredentials: true,
        });
        setCartItems(response.data.cart);
        calculateTotalAmount(response.data.cart);
      } catch (err) {
        setError("Failed to fetch cart items");
        console.error("Error fetching cart items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
    setTotalAmount(total);
  };

  const handleIncrease = async (productId) => {
    const updatedCart = cartItems.map(item => 
      item._id === productId ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    calculateTotalAmount(updatedCart);
  };

  const handleDecrease = async (productId) => {
    const updatedCart = cartItems.map(item => 
      item._id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCartItems(updatedCart);
    calculateTotalAmount(updatedCart);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/user/cart", {
        data: { productId },
        withCredentials: true,
      });
      const updatedCart = cartItems.filter(item => item._id !== productId);
      setCartItems(updatedCart);
      calculateTotalAmount(updatedCart);
    } catch (err) {
      console.error("Error removing product from cart:", err);
      setError("Failed to remove product from cart");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Cart Page</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <h2>Cart Items:</h2>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div>
                  <strong>{item.title}</strong> - ₹{item.price}
                  <p>Quantity: {item.qty || 1}</p>
                  <p>₹{parseInt(item.price) * parseInt(item.qty || 1)}</p>
                </div>
                <div>
                  <button onClick={() => handleIncrease(item._id)}>Increase</button>
                  <button onClick={() => handleDecrease(item._id)}>Decrease</button>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3>
        </div>
      )}
    </div>
  );
}
