const express = require("express");
const router = express.Router();
const passport = require('passport');

//Importing a model
const Signup = require("../models/Signup");
const Product = require("../models/Product");

//Signup route
router.get("/signup",async(req, res) => {
  // console.log('success query:', req.query.success);

  res.render("signup", {
    success: req.query.success,
  });
});

router.post("/signup",async (req, res) => {
  //  console.log("BODY:", req.body);
  try {
    const { fullname, email, phonenumber } = req.body;

    const phoneRegex = /^\+256[0-9]{9}$/;

    if (!phoneRegex.test(phonenumber)) {
      return res.render("signup", {
        error: "Invalid phone number. Use format +256XXXXXXXXX"
      });
    }

    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if(password !== confirmpassword){
      return res.render('signup', { error: 'Passwords do not match' });
    }

    // //Check if user already exists
    let existingUser = await Signup.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.render("signup", { 
        error: "Email is already registered" 
      });
    }

    let phone = phonenumber.replace(/\s/g, "");

    //create a new user
    const newUser = new Signup({
      fullname,
      email: email.toLowerCase(),
      phonenumber: phone
    });
    console.log(newUser);

    await Signup.register(newUser,password);

    console.log("User registered successfully");

    // return res.redirect("/signup?success=Account created successfully!");
    return res.render("signup", { success: "Account created successfully!" });

  } catch (error) {
    console.error(error);
    res.render("signup", { error: error.message });
  }
});

//Login route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log("ERR:", err);
    // console.log("USER:", user);
    // console.log("INFO:", info);

    if (err) return next(err);
    if (!user) return res.redirect('/login');

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/successful');
    });
  })(req, res, next);
});

router.get('/successful', (req, res) => {
  res.render('success');
});

router.get("/dashboard", async (req, res) => {

  const products = await Product.find();

  let totalStockValue = 0;
  
  products.forEach(product => {
    totalStockValue += Number(product.quantity || 0) * Number(product.price || 0);
  });

console.log("TOTAL STOCK VALUE:", totalStockValue);
console.log("PRODUCTS:", products);

  res.render("dashboard", {
    products: products,
    success: req.query.success,
    error: req.query.error,
    totalStockValue
  });
});

router.post("/add-product", async (req, res) => {

  try {

    const newProduct = new Product({
      productname: req.body.productname,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      color: req.body.color
    });

    await newProduct.save();

    res.redirect("/dashboard?success=Product has been added successfully!");

  } catch (error) {
    console.log(error);

    res.redirect('/dashboard?error=Failed to add product');
  }

});


module.exports = router;
