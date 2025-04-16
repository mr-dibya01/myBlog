const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/myBlog');
  console.log("Database Connnected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  //   67fb224d5b45cbfbc401e476
}

main().catch(err => console.log(err));

const User=require("../models/user.js");
const Blog=require("../models/blogModel.js");

let userData= {
    name: "Mr dibya",
    username: "_.steevedibya._",
    email: "dibya@gmail.comm",
    pasword:"12345"
}

let blogs= [
      {
        title: "Welcome to Blogify!",
        description: "This is the first blog post on our platform. Stay tuned!",
        author: "67fb224d5b45cbfbc401e476",
      },
      {
        title: "Tech Trends 2025",
        description: "Let's discuss the future of AI, Blockchain, and more...",
        author: "67fb224d5b45cbfbc401e476",
      },
    ]


// initBlogData();

const initData=async ()=>{
    await User.deleteMany({});
    await Blog.deleteMany({});
    let userResult=await User.insertOne(userData);
    console.log("userResult :",userResult);
    blogs=blogs.map((obj)=>({...obj,author:userResult._id}));
    let blogResult=await Blog.insertMany(blogs);
    console.log("blogResult :",blogResult);
    console.log("Database seeding done.");
    mongoose.connection.close();
};

initData();