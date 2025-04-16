const User=require("../models/user.js");


module.exports.renderLoginFrom=(req,res)=>{
    res.render("user/login.ejs");
};

module.exports.userLogin=(req, res)=> {
    let redirectUrl=res.locals.redirectUrl || "/posts";
    delete req.session.returnTo;
    req.flash("success","User successFully Loged In");
    res.redirect(redirectUrl);
};

module.exports.renderSignUpFrom=(req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.createNewUser=async (req,res,next)=>{
    let { username,name,email,password }=req.body;
    let newUser=new User({username,name,email});
    let registerUser=await User.register(newUser,password);
    req.login(registerUser,(err)=>{
        if(err){ next(err); }
        req.flash("success","Welcome to Posts");
        res.redirect("/posts");
    });
};

module.exports.userLogOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){ return next(err); }
        res.redirect("/posts");
    })
};