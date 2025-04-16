const Blog=require("./models/blogModel");
const Comment = require("./models/commment");


module.exports.isLogedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo=req.originalUrl;
    req.flash("error","you should be Loged In!");
    res.redirect("/login");
};

module.exports.returnUrl=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.redirectUrl=req.session.returnTo;
    }
    next();
};

module.exports.isOwner=async (req,res,next)=>{
    let blog=await Blog.findById(req.params.id);
    console.log(blog);
    console.log(blog.author);
    if(blog.author.equals(req.user._id)){
        return next();
    }
    req.flash("error","You should be owner of the Blog");
    res.redirect(`/posts/${req.params.id}`);
};

module.exports.isOwnerComment=async (req,res,next)=>{
    let comment=await Comment.findById(req.params.commentId);
    if(comment.creator.equals(req.user._id)){
        return next();
    }
    req.flash("error","You should be owner of the Comment");
    res.redirect(`/posts/${req.params.id}`);
};

module.exports.wrapAsync=(fn)=>{
    return function(req,res,next){
        console.log("noeee");
        fn(req,res,next).catch((err)=>next(err));
    }
};