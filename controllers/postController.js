const postService = require('../services/postService');

const getPosts = (req, res) => {
    try {
        const posts = postService.getAllPosts();

        res.status(200).json(posts);
    } catch (error){
        res.status(500).json({ message:"Mutfakta yangın çıktı!"});    
    }   
};