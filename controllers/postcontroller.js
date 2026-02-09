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
module.exports = { createPost };