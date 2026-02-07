const postService = require('../services/postService');

const getPosts = (req, res) => {
    res.json(postService.getAllPosts());
};

const getPostById = (req, res) => {
    const post = postService.getPostById(req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: "Bulunamadı" });
    }
};

module.exports = { getPosts, getPostById };