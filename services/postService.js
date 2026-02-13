const AppDataSource = require("../data-source");
const Post = require("../entity/Post");
const User = require("../entity/User");

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

const createPost = async (userId, title, content,) => {
    const user = await userRepository.findOneBy({ id: userId});
    if (!user) {
        throw new Error("Böyle bir yazar bulunamadı, post atılamaz!");
    }
    const newPost = postRepository.create({
        title: title,
        content: content,
        user: user,
    });
    await postRepository.save(newPost);
    return newPost;
};

const getAllPosts = async () => {
    return await postRepository.find({
        order: { id: "DESC" }
    });
};

const getPostById = async (postId) => {
    const post = await postRepository.findOneBy({ id: postId });
    if (!post) {
        throw new Error("Post bulunamadı!");
    }
    return post;
};
module.exports = { createPost, getAllPosts, getPostById};
