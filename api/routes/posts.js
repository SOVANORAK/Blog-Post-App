const express = require("express");
const {
  getPosts,
  getOnePost,
  deletePost,
  updatePost,
  addPost,
} = require("../controllers/post");

const router = express.Router();

//Fetch all posts
router.get("/", getPosts);
//Fetch a single post
router.get("/:id", getOnePost);
//Create Post
router.post("/", addPost);
//Delete post
router.delete("/:id", deletePost);
//Update post
router.put("/:id", updatePost);

module.exports = router;
