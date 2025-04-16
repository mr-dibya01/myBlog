const express= require("express");
const router= express.Router({ mergeParams:true });
const { isLogedIn,isOwnerComment }= require("../middleware.js");
const commentController= require("../controller/comment.js");


// Create new comment route
router.post("/",isLogedIn,commentController.createNewComment);

// Render editComment from
router.get("/:commentId/edit",isLogedIn,isOwnerComment,commentController.renderCommentEditFrom);

//  edit Comment route
router.put("/:commentId",isLogedIn,isOwnerComment,commentController.editComment);

// Destroy comment route
router.delete("/:commentId",isLogedIn,isOwnerComment,commentController.destroyComment);

module.exports=router;