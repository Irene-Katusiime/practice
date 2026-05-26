const express = require("express");
const router = express.Router();
const passport = require('passport');

//Importing a model
const Signup = require("../models/Signup");

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

        
    return res.render("/signup?success=Account created successfully!");

  } catch (error) {
    console.error(error);
    res.render("signup", { error: error.message });
  }
});

//Login route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",passport.authenticate('local',{failureRedirect:'/login'}), (req, res) => {

});



// //Logout route
// router.get("/logout", (req, res) => {
//   req.logout((err)=>{
//     if(err){
//       return next(err);
//     }
//     res.redirect('/')
//   });
// });

// //Index route
// router.get('/', (req,res)=>{
//     res.render('index')
// });


module.exports = router;
