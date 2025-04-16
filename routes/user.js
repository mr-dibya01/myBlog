const express=require("express");
const router=express.Router();
const passport=require("passport");
const { returnUrl,wrapAsync }= require("../middleware.js");
const userController=require("../controller/user.js");

// Render login from
router.get("/login",userController.renderLoginFrom);

// Log In Route
router.post("/login",returnUrl,passport.authenticate('local', { 
        failureRedirect: '/login',
        failureFlash: true,
        }), 
       userController.userLogin
    );
// signup
router.get("/signup",userController.renderSignUpFrom);

// create user
router.post("/signup",wrapAsync(userController.createNewUser));

// Log Out
router.get("/logout",userController.userLogOut);

module.exports=router;