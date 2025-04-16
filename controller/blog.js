const expressError = require("../expressError.js");
const Blog= require("../models/blogModel.js");
const Comment= require("../models/commment.js");

module.exports.index=async (req,res)=>{
    let blogs=await Blog.find().populate("author");
    res.render("blog/index.ejs",{ blogs });
};

module.exports.renderNewFrom=(req,res)=>{
    res.render("blog/new.ejs");
};

module.exports.showBlog=async (req,res)=>{
    let blog= await Blog.findById(req.params.id)
    .populate("author")
    .populate({
        path:"comments",
        populate: {
            path:"creator",
        }
    });
    if(!blog){
        throw new expressError(401,"You entered Wrong id");
    }
    res.render("blog/show.ejs",{ blog }); 
};

module.exports.createNewBlog=async (req,res)=>{
    let blog=new Blog(req.body);
    blog.author=req.user._id;
    await blog.save();
    req.flash('success', 'Blog successFully Created!');
    res.redirect("/posts");
};

module.exports.renderEditFrom=async(req,res)=>{
    let blog= await Blog.findById(req.params.id);
    res.render("blog/edit.ejs",{ blog });
};

module.exports.updateRoute=async(req,res)=>{
    console.log("updateRoute");
    let blog=await Blog.findById(req.params.id);
    if(!blog){
        console.log("huu");
        throw new expressError(401,"you entered Wrong id");
    }
    await Blog.findByIdAndUpdate(req.params.id,req.body);
    req.flash('success', 'Blog successFully Updated!');
    res.redirect("/posts");
};

module.exports.destroyRoute=async(req,res)=>{
    let blog=await Blog.findById(req.params.id);
    await Comment.deleteMany({ _id: { $in: blog.comments }})
    req.flash('success', 'Blog successFully Deleted!');
    res.redirect("/posts");
};