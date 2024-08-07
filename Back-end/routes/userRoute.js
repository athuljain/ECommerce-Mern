const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const user = require("../controller/user");
const bodyParser = require("body-parser");

const userMiddleware = require("../middileware/userMiddileware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

app.post("/register", user.userRegister);
app.post("/login", user.userLogin, userMiddleware); // No userMiddleware here

// Middleware applied only to routes after successful login

app.get("/getProducts", userMiddleware, user.userGetProducts);
app.get("/products/:id", userMiddleware, user.specificProduct);
app.get("/products/category/:category", userMiddleware, user.getCategoryWise);
app.post("/addToCart", user.addToCart); 
app.get("/cart", user.getCart);
app.delete("/cart",user.removeFromCart)
app.get("/details", userMiddleware, user.userDetails);
module.exports = app;
