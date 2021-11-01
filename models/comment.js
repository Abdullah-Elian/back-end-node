const comment =require('../schema/commentSchema')
const sequelize = require('../connect-database/database')

console.log(comment);
const Comment = sequelize.define('comment',comment);


module.exports = Comment;