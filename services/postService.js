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
module.exports = { createPost};
