const postService = require("../services/postService");
const { AppSuccessResponse, AppFailResponse} = require("../utils/response");

const createPost = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const newPost = await postService.createPost(userId, title, content);
        res.status(201).json(new AppSuccessResponse("Post başarıyla oluşturuldu!",newPost));
    } catch (error) {
        res.status(400).json(new AppFailResponse(error.message));
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(new AppSuccesResponse(" Postlar getirildi.", posts));
    } catch (error) {
        res.status(500).json(new AppFailResponse(error.message));
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        res.status(200).json(new AppSuccessResponse(" Post detayı getirildi.", post));
    } catch (error) {
        res.status(404).json(new AppFailResponse(error.message));
    }
};
 
module.exports = { createPost, getPosts, getPostById };  