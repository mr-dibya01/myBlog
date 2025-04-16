if(process.env.NODE_ENV != "production" ){
  require('dotenv').config();
}




const express=require("express");
const path=require("path");
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const app=express();
const blogRoute=require("./routes/blog.js");
const userRoute=require("./routes/user.js")
const commentRoute=require("./routes/comment.js")
const User=require("./models/user.js");
const methodOverride = require('method-override')
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const Blog=require("./models/blogModel.js");
const { wrapAsync } = require('./middleware.js');

async function main() {
  await mongoose.connect(process.env.ATLAS_URL);
  console.log(`MONGO Connected Db Host: ${mongoose.connection.host}`);
}

main().catch(err => console.log(err));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public"))); 
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));

const store=MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  touchAfter: 24 * 3600, // time period in seconds
    crypto : {
       secret: process.env.SECRET_CODE
    }
})

const sessionOptions={
  store,
  secret: process.env.SECRET_CODE,
  resave: false,
  saveUninitialized: true,
};

app.use(session( sessionOptions ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash('success');
  res.locals.error=req.flash('error');
  res.locals.currUser=req.user;
  next();
});


app.get("/",wrapAsync(async (req,res)=>{
  let blogs=await Blog.find().populate("author");
  res.render("blog/index.ejs",{ blogs });
}));

app.use("/posts",blogRoute);
app.use("/posts/:id/comments",commentRoute);
app.use("/",userRoute);




app.use((err,req,res,next)=>{
  let { status=500,message="Something went Wrong" }=err;
  res.status(status).render("error.ejs",{ message });
});

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});