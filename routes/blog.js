const express= require("express");
const router= express.Router();
const blogValidation= require("../schemaValidation.js");
const expressError= require("../expressError.js");
const { isLogedIn,isOwner }= require("../middleware.js");
const blogController= require("../controller/blog.js");

const blogValidate=(req,res,next)=>{
    let { error } = blogValidation.validate(req.body);
    if(error){
        throw new expressError(401,error.message);        
    }
    next(); 
};

const wrapAsync=(fn)=>{
    return function(req,res,next){
        console.log("noeee");
        fn(req,res,next).catch((err)=>next(err));
    }
};

// index route
router.get("/",wrapAsync(blogController.index));

// render new post from
router.get("/new",isLogedIn,blogController.renderNewFrom);

// show route
router.get("/:id",isLogedIn,wrapAsync(blogController.showBlog));

// create new post
router.post("/",isLogedIn,blogValidate,wrapAsync(blogController.createNewBlog));

// Edit Route
router.get("/edit/:id",isLogedIn,isOwner,wrapAsync(blogController.renderEditFrom));

// Update Route
router.put("/:id",isLogedIn,isOwner,blogValidate,wrapAsync(blogController.updateRoute));

// Destroy Route
router.delete("/:id",isLogedIn,isOwner,wrapAsync(blogController.destroyRoute));

module.exports=router;