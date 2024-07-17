// src/component/UserDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../Context.js";
import axios from "axios";
import "./Style/UserDetails.css";

const UserDetails = () => {
  const { userToken } = useContext(myContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/details", {
          headers: {
            Authorization: userToken,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userToken) {
      fetchUserDetails();
    }
  }, [userToken]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <p>Name: {userDetails.name}</p>
      <p>Email: {userDetails.email}</p>
      <p>Cart Items: {userDetails.cart.length}</p>
    </div>
  );
};

export default UserDetails;
