

// import React, { useContext, useEffect, useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { myContext } from "../Context";
// import "./Style/Home.css";

// export default function Home() {
//   const { products, setProducts, isLoggedIn, setIsLoggedIn } = useContext(myContext);
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:5000/user/getProducts",
//         {
//           withCredentials: true,
//         }
//       );

//       const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//       const updatedProducts = response.data.allProducts.map(product => ({
//         ...product,
//         inCart: cartItems.includes(product._id),
//       }));

//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [setProducts]);

//   useEffect(() => {
//     fetchProducts();

//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, [fetchProducts, setIsLoggedIn]);

//   const addToCart = async (productId) => {
//     if (!isLoggedIn) {
//       alert("Please login to add to cart");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToCart",
//         { productId },
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//         const updatedProducts = products.map(product =>
//           product._id === productId ? { ...product, inCart: true } : product
//         );
//         setProducts(updatedProducts);
//         const updatedCartItems = [...cartItems, productId];
//         localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//         alert("Product added to cart successfully");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         alert("Product already in cart");
//       } else {
//         console.error("Error adding product to cart:", error);
//         alert("Failed to add product to cart");
//       }
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/user/cart`, {
//         data: { productId },
//         withCredentials: true,
//       });
//       const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//       const updatedProducts = products.map(product =>
//         product._id === productId ? { ...product, inCart: false } : product
//       );
//       setProducts(updatedProducts);
//       const updatedCartItems = cartItems.filter(item => item !== productId);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//       alert("Product removed from cart successfully");
//     } catch (err) {
//       console.error("Error removing product from cart:", err);
//       alert("Failed to remove product from cart");
//     }
//   };

//   const handleCartAction = async (product) => {
//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };

//   const handleGetProductsByCategory = async (category) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:5000/user/products/category/${category}`,
//         {
//           withCredentials: true,
//         }
//       );
//       const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//       const updatedProducts = response.data.map(product => ({
//         ...product,
//         inCart: cartItems.includes(product._id),
//       }));
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error(`Error fetching ${category} products:`, error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetLaptopProducts = () => {
//     handleGetProductsByCategory("laptop");
//     nav(`/laptops`); 
//   };

//   const handleGetPhoneProducts = () => {
//     handleGetProductsByCategory("phone");
//     nav(`/phones`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("cartItems");
//     setIsLoggedIn(false);
//     nav("/");
//   };

//   return (
//     <div className="container">
//       <div className="sub-Container">
//         <Link to={"/cart"}>Cart</Link>
//         {isLoggedIn ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <Link to={"/"}>Login</Link>
//         )}
//         <h1 className="Home-Head">Home Page</h1>
//       </div>
//       <div className="HomeMainBoady">
//         <h2 className="bodyHead">Product List</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="bodyinner" style={{ display: "flex" }}>
//             {products.map((product) => (
//               <div className="body-card" key={product._id}>
//                 <Link to={`/product/${product._id}`}>
//                   <img className="ProductImg" src={product.image} alt="img" />
//                 </Link>
//                 <h4 className="ProductTitle">{product.title}</h4>
//                 <h5 className="ProductDes">{product.description}</h5>
//                 <h4 className="ProductPrice">{product.price}</h4>
//                 <button
//                   onClick={() => handleCartAction(product)}
//                 >
//                   {product.inCart ? "Remove from Cart" : "Add to Cart"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="CategoryDiv">
//         <button className="CategoryBtn" onClick={handleGetLaptopProducts}>Get Laptop Products</button>
//         <button className="CategoryBtn" onClick={handleGetPhoneProducts}>Get Phone Products</button>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css";

export default function Home() {
  const { products, setProducts, isLoggedIn, setIsLoggedIn } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Fetch the cart items for the logged-in user
  const fetchCartItems = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
        return response.data.cartItems.map(item => item._id);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        return [];
      }
    }
    return [];
  };

  // Fetch products and update their inCart status based on the fetched cart items
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/user/getProducts", { withCredentials: true });
      const cartItems = await fetchCartItems();

      const updatedProducts = response.data.allProducts.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id),
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [setProducts, isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    fetchProducts();
  }, [fetchProducts, setIsLoggedIn]);

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      alert("Please login to add to cart");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        { withCredentials: true }
      );
      if (response.status === 200) {
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
      await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });
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

  const handleCartAction = async (product) => {
    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };

  const handleGetProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/user/products/category/${category}`, { withCredentials: true });
      const cartItems = await fetchCartItems();

      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id),
      }));

      setProducts(updatedProducts);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    nav("/");
  };

  return (
    <div className="container">
      <div className="sub-Container">
        <Link to={"/cart"}>Cart</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
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
      <div className="CategoryDiv">
        <button className="CategoryBtn" onClick={handleGetLaptopProducts}>Get Laptop Products</button>
        <button className="CategoryBtn" onClick={handleGetPhoneProducts}>Get Phone Products</button>
      </div>
    </div>
  );
}
