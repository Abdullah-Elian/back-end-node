const user =require('../schema/userSchema')
const sequelize = require('../connect-database/database')


const User = sequelize.define('user',user);


module.exports = User;