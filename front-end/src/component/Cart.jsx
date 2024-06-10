import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myContext } from "../Context";

export default function Cart() {
  const { products, setProducts, cartItems, setCartItems } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/user/cart", {
          withCredentials: true,
        });
        setCartItems(response.data.cart);
      } catch (err) {
        setError("Failed to fetch cart items");
        console.error("Error fetching cart items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <h2>Cart Items:</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <strong>{item.title}</strong> - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
