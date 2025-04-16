const Blog= require("../models/blogModel.js");
const Commment = require("../models/commment.js");



module.exports.createNewComment=async (req,res)=>{
    let blog=await Blog.findById(req.params.id);
    let comment= new Commment(req.body);
    comment.creator=req.user._id;
    blog.comments.push(comment);
    await blog.save();
    await comment.save();
    req.flash("success","Successfully comment added");
    res.redirect(`/posts/${blog._id}`);
};

module.exports.renderCommentEditFrom=async (req,res)=>{
    let blog=await Blog.findById(req.params.id);
    console.log(blog._id);
    let comment=await Commment.findById(req.params.commentId);
    res.render("comment/edit.ejs",{ blog,comment });
};

module.exports.editComment=async (req,res)=>{
    let { id,commentId }=req.params;
    console.log(id);
    let blog=await Blog.findById(id);
    console.log(blog);
    let comment=await Commment.findByIdAndUpdate(commentId,req.body);    
    console.log(comment);
    req.flash("success","Commment Successfully Updated");
    res.redirect(`/posts/${blog._id}`);
};

module.exports.destroyComment=async (req,res)=>{
    let { id,commentId }=req.params;
    let blog= await Blog.findById(id);
    let comment= await Commment.findById(commentId).populate("creator");
    if(req.user._id.equals(comment.creator)){
        await Blog.findByIdAndUpdate( id,{ $pull:{ comments: commentId }});
        await Commment.findByIdAndDelete(commentId);
        req.flash("success","Successfully comment Deleted");
        return res.redirect(`/posts/${blog._id}`);
    }
    req.flash("error","you should be owner of Comment"); 
    res.redirect(`/posts/${blog._id}`);
};