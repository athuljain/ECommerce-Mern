

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Product = require("../model/productModel");
const { default: mongoose } = require("mongoose");


// User Registration
const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};


// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60,
      });
      res.setHeader("Authorization", token);

      res.status(200).json({ message: "Welcome user", token, user: { email: user.email, name: user.name } });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};

const userGetProducts = async (req, res) => {
  try {
    // Fetch all products
    const allProducts = await Product.find();
    console.log("All Products:", allProducts); // Log all products fetched from the database

    // Fetch user's cart items
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out null or undefined values from user's cart
    const userCart = user.cart.filter(id => id !== null && id !== undefined).map(id => id.toString());
    console.log("User Cart:", userCart); // Log user's cart items

    // Check if each product is in the user's cart
    const productsWithCartStatus = allProducts.map(product => ({
      ...product.toObject(),
      inCart: userCart.includes(product._id.toString())
    }));

    console.log("Products with Cart Status:", productsWithCartStatus); // Log final products with cart status
    res.status(200).json({ allProducts: productsWithCartStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};


// Get Products by Category
const getCategoryWise = async (req, res) => {
  const categoryList = req.params.category;
  try {
    const categoryProducts = await Product.find({ category: categoryList });
    res.json(categoryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Specific Product
const specificProduct = async (req, res) => {
  try {
    const specificProduct = await Product.findById(req.params.id);

    if (specificProduct) {
      return res.status(200).json({ message: "Specific Product:", specificProduct });
    }
    return res.status(404).json({ error: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already in the user's cart
    if (user.cart.includes(productId)) {
      return res.status(200).json({ message: "Product is already in the cart" });
    }

    // Add product to user's cart if it's not already there
    user.cart.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};



// Get Cart
const getCart = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).populate('cart');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists in the user's cart
    const index = user.cart.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Remove the product from the user's cart
    user.cart.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

const userDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).populate('cart');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};



module.exports = {
  userRegister,
  userLogin,
  userGetProducts,
  specificProduct,
  addToCart,
  getCategoryWise,
  getCart,
  removeFromCart,
  userDetails
};

