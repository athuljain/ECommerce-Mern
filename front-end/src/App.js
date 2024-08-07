// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Register from "./component/Registration.jsx";
// import Login from "./component/Login.jsx";
// import { myContext } from "./Context.js";
// import Home from "./component/Home.jsx";
// import AdminLogin from "./component/Admin/AdminLogin.jsx";
// import AdminPage from "./component/Admin/AdminPage.jsx";
// import AdminUsers from "./component/Admin/AdminUsers.jsx";
// import AdminAddProduct from "./component/Admin/AdminAddProduct.jsx";
// import AdminProducts from "./component/Admin/AdminProducts.jsx";
// import AdminEditProduct from "./component/Admin/AdminEditProduct.jsx";
// import SpecificProductPage from "./component/SpecificProduct.jsx";
// import Laptop from "./component/Laptop.jsx";
// import Phone from "./component/Phone.jsx";
// import Cart from "./component/Cart.jsx";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [adminEmail, setAdminEmail] = useState("");
//   //const [adminPassword, setAdminPassword] = useState('');
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     price: "",
//     image: "",
//     category: "",
//     brand: "",
//   });

//   const [token, setToken] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [userToken, setUserToken] = useState(null);
//   const [specificProduct, setSpecificProduct] = useState({});
//   const [cartItems, setCartItems] = useState([]); // Initialize cartItems state
//   const [inCart, setInCart] = useState(false); // Define state to check if the product is in the cart
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   console.log(isLoggedIn);

//   const values = {
//     email,
//     setEmail,
//     password,
//     setPassword,

//     name,
//     setName,
//     confirmPassword,
//     setConfirmPassword,
//     //adminPassword, setAdminPassword,
//     adminEmail,
//     setAdminEmail,
//     product,
//     setProduct,
//     token,
//     setToken,
//     products,
//     setProducts,
//     userToken,
//     setUserToken,
//     specificProduct,
//     setSpecificProduct,
//     cartItems,
//     setCartItems,
//     inCart,
//     setInCart,
//     isLoggedIn, setIsLoggedIn
//   };
//   //console.log("front end token",token);
//   console.log("cart",cartItems);
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <myContext.Provider value={values}>
//           <Routes>
//             <Route path="/adminLogin" element={<AdminLogin />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/adminProducts" element={<AdminProducts />} />
//             <Route path="/addProduct" element={<AdminAddProduct />} />
//             <Route path="/adminUsers" element={<AdminUsers />} />
//             <Route
//               path="/adminEditProduct/:productId"
//               element={<AdminEditProduct />}
//             />

//             <Route path="/register" element={<Register />} />
//             <Route path="/" element={<Login />} />
//             <Route path="/home" element={<Home />} />
//             <Route
//               path="/product/:productId"
//               element={<SpecificProductPage />}
//             />
//             <Route path="/laptops" element={<Laptop />} />
//             <Route path="/phones" element={<Phone />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </myContext.Provider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Register from "./component/Registration.jsx";
// import Login from "./component/Login.jsx";
// import { myContext } from "./Context.js";
// import Home from "./component/Home.jsx";
// import AdminLogin from "./component/Admin/AdminLogin.jsx";
// import AdminPage from "./component/Admin/AdminPage.jsx";
// import AdminUsers from "./component/Admin/AdminUsers.jsx";
// import AdminAddProduct from "./component/Admin/AdminAddProduct.jsx";
// import AdminProducts from "./component/Admin/AdminProducts.jsx";
// import AdminEditProduct from "./component/Admin/AdminEditProduct.jsx";
// import SpecificProductPage from "./component/SpecificProduct.jsx";
// import Laptop from "./component/Laptop.jsx";
// import Phone from "./component/Phone.jsx";
// import Cart from "./component/Cart.jsx";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [adminEmail, setAdminEmail] = useState("");
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     price: "",
//     image: "",
//     category: "",
//     brand: "",
//   });

//   const [token, setToken] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [userToken, setUserToken] = useState(null);
//   const [specificProduct, setSpecificProduct] = useState({});
//   const [cartItems, setCartItems] = useState([]);
//   const [inCart, setInCart] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const values = {
//     email,
//     setEmail,
//     password,
//     setPassword,
//     name,
//     setName,
//     confirmPassword,
//     setConfirmPassword,
//     adminEmail,
//     setAdminEmail,
//     product,
//     setProduct,
//     token,
//     setToken,
//     products,
//     setProducts,
//     userToken,
//     setUserToken,
//     specificProduct,
//     setSpecificProduct,
//     cartItems,
//     setCartItems,
//     inCart,
//     setInCart,
//     isLoggedIn,
//     setIsLoggedIn,
//   };

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <myContext.Provider value={values}>
//           <Routes>
//             <Route path="/adminLogin" element={<AdminLogin />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/adminProducts" element={<AdminProducts />} />
//             <Route path="/addProduct" element={<AdminAddProduct />} />
//             <Route path="/adminUsers" element={<AdminUsers />} />
//             <Route path="/adminEditProduct/:productId" element={<AdminEditProduct />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/" element={<Login />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/product/:productId" element={<SpecificProductPage />} />
//             <Route path="/laptops" element={<Laptop />} />
//             <Route path="/phones" element={<Phone />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </myContext.Provider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;





// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./component/Registration.jsx";
import Login from "./component/Login.jsx";
import { myContext } from "./Context.js";
import Home from "./component/Home.jsx";
import AdminLogin from "./component/Admin/AdminLogin.jsx";
import AdminPage from "./component/Admin/AdminPage.jsx";
import AdminUsers from "./component/Admin/AdminUsers.jsx";
import AdminAddProduct from "./component/Admin/AdminAddProduct.jsx";
import AdminProducts from "./component/Admin/AdminProducts.jsx";
import AdminEditProduct from "./component/Admin/AdminEditProduct.jsx";
import SpecificProductPage from "./component/SpecificProduct.jsx";
import Laptop from "./component/Laptop.jsx";
import Phone from "./component/Phone.jsx";
import Cart from "./component/Cart.jsx";
import UserDetails from "./component/UserDetails.jsx"; // Import UserDetails

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    brand: "",
  });

  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [specificProduct, setSpecificProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const values = {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
    adminEmail,
    setAdminEmail,
    product,
    setProduct,
    token,
    setToken,
    products,
    setProducts,
    userToken,
    setUserToken,
    specificProduct,
    setSpecificProduct,
    cartItems,
    setCartItems,
    inCart,
    setInCart,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Routes>
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminProducts" element={<AdminProducts />} />
            <Route path="/addProduct" element={<AdminAddProduct />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/adminEditProduct/:productId" element={<AdminEditProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:productId" element={<SpecificProductPage />} />
            <Route path="/laptops" element={<Laptop />} />
            <Route path="/phones" element={<Phone />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user-details" element={<UserDetails />} /> {/* New Route */}
          </Routes>
        </myContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
