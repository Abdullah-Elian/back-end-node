const post =require('../schema/postSchema')
const sequelize = require('../connect-database/database')


const Post = sequelize.define('post',post);


module.exports = Post;