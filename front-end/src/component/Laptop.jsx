// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { myContext } from "../Context";

// const Laptop = () => {
//   const { products, setProducts ,cartItems, setCartItems} = useContext(myContext);
//   const [loading, setLoading] = useState(false);

//   const fetchLaptopProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:5000/user/products/category/laptop",
//         {
//           withCredentials: true,
//         }
//       );
//       // Toggle inCart property for products based on cartItems
//       const updatedProducts = response.data.map(product => ({
//         ...product,
//         inCart: cartItems.some(item => item._id === product._id)
//       }));
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error fetching laptop products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLaptopProducts();
//   }, []);

//   const handleCartAction = async (product) => {
//     if (product.inCart) {
//       await removeFromCart(product._id);
//     } else {
//       await addToCart(product._id);
//     }
//   };

//   const addToCart = async (productId) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/addToCart",
//         { productId },
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         // Toggle inCart property of the product
//         const updatedProducts = products.map(product =>
//           product._id === productId ? { ...product, inCart: true } : product
//         );
//         setProducts(updatedProducts);
//         setCartItems(prevCartItems => [...prevCartItems, productId]);
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
//       // Toggle inCart property of the product
//       const updatedProducts = products.map(product =>
//         product._id === productId ? { ...product, inCart: false } : product
//       );
//       setProducts(updatedProducts);
//       setCartItems(cartItems.filter(item => item !== productId));
//       alert("Product removed from cart successfully");
//     } catch (err) {
//       console.error("Error removing product from cart:", err);
//       alert("Failed to remove product from cart");
//     }
//   };
//   return (
//     <div className="container">
//       <div className="sub-Container">
//         <h1 className="Laptop-Head">Laptop Products</h1>
//       </div>
//       <div className="LaptopMainBody">
//         <h2 className="bodyHead">Laptop List</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="bodyinner" style={{ display: "flex" }}>
//             {products.map((product) => (
//               <div className="body-card" key={product._id}>
//                 <Link to={`/product/${product._id}`}>
//                   <img src={product.image} alt="img" />
//                 </Link>
//                 <h4>{product.title}</h4>
//                 <h5>{product.description}</h5>
//                 <h4>{product.price}</h4>
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
//     </div>
//   );
// };

// export default Laptop;


import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";

const Laptop = () => {
  const { products, setProducts } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Get cart items from localStorage on component mount
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    fetchLaptopProducts();
  }, []);

  const fetchLaptopProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/products/category/laptop",
        {
          withCredentials: true,
        }
      );
      // Toggle inCart property for products based on cartItems
      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id)
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching laptop products:", error);
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
        // Update local cartItems state
        const updatedCartItems = [...cartItems, productId];
        setCartItems(updatedCartItems);
        // Update inCart property of the product
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
      // Update local cartItems state
      const updatedCartItems = cartItems.filter(item => item !== productId);
      setCartItems(updatedCartItems);
      // Update inCart property of the product
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

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="container">
      <div className="sub-Container">
        <h1 className="Laptop-Head">Laptop Products</h1>
      </div>
      <div className="LaptopMainBody">
        <h2 className="bodyHead">Laptop List</h2>
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

export default Laptop;
