const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const blogSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref:"Comments"
    }]
});

const Blog= mongoose.model("Blog",blogSchema);

module.exports=Blog;