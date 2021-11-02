const express = require('express');

const app= express();

const bodyParser = require('body-parser');


// import models
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

// import to sync models with database 
const sequelize = require('./connect-database/database');

//import post routes
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())

require('dotenv').config()

app.use(postRoutes);
app.use(userRoutes);
app.use(commentRoutes);

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/',(req,res,next)=>{
//     res.send("hello");
// })

Post.belongsTo(User);
User.hasMany(Post);

Comment.belongsTo(Post);
Post.hasMany(Comment)

sequelize
.sync()
.then(result =>{
    // console.log(result);
    app.listen(3005);
})

.catch(err=>{
    console.log("test sync");
    res.status(500).send("error");
})

module.exports = app