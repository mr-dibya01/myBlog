const mongoose=require("mongoose");
const { type } = require("../schemaValidation");
const Schema=mongoose.Schema;

const commentSchema= new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});


const Comment=mongoose.model("Comments",commentSchema);

module.exports=Comment;