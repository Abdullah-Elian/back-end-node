const Post = require('../models/post');

exports.getPost = (req, res, next) => {
    Post.findAll()
        .then(posts => {
            res.send(posts)
        })
        .catch(err => {
            res.status(500).send("error");
        })
};

exports.addPost = (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const userId = req.body.userId;
    Post.create({
        title: title,
        body: body,
        userId: userId
    })
    .then(result=>{
        console.log("Created New Post");
        res.status(201).send(result);
    })
    .catch(err=>{
        res.status(500).send("error");
    })
}

exports.deletePost = (req,res,next)=>{
    console.log("abdullah From delete");
    const postId = req.params.id;
    Post.findByPk(postId)

    .then(post=>{
        return post.destroy();
    })
    .then(result =>{
        console.log("Deleted");
        res.send(result);
    })
    .catch(err=>{
        res.status(500).send("error");
    })
}


exports.updatePost= (req,res,next)=>{
    const postId = req.params.id;

    const updatedTitle = req.body.title;
    const updatedBody = req.body.body;
    Post.findByPk(postId)
    .then(post=>{
        post.title = updatedTitle
        post.body = updatedBody
        return post.save()
    })
    .then(result=>{
        res.status(204).send(result);
        console.log("updated");
    })
    .catch(err=>{
        res.status(500).send("error");
    });
}