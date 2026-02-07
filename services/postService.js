const posts = [
    { id: 1, title: "Nodemon ile Hayat çok güzel", content: "Kodlarını parçalara böl, yönetmesi kolay olsun." },
    { id: 2, title: "Axios Nedir?", content: "Frontend'in Backend ile konuşmasını sağlayan elçidir." },
    { id: 3, title: "Express Gücü", content: "Node.js üzerinde sunucu kurmanın en popüler yoludur." }
];

const getAllPosts = () => posts;
const getPostById = (id) => posts.find(post => post.id === parseInt(id));

module.exports = { getAllPosts, getPostById };