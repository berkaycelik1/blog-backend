const postService = require('../services/postService');

const getPosts = (req, res) => {
    console.log("‼️ DİKKAT: Biri /post adresine girdi");
    try {
        const posts = postService.getAllPosts();
        console.log("VERİLER:", posts);

        res.status(200).json(posts);
    } catch (error){
        res.status(500).json({ message:"Bir şeyler ters gitti" });    
    }   
};

module.exports = {
    getPosts
};