const Comment = require('../models/comment');

exports.getComment = (req, res, next) => {
    Comment.findAll()
        .then(Comment => {
            res.send(Comment)
        })
        .catch(err => {
            res.status(500).send("error");
        })
};

exports.addComment= (req, res, next) => {
    console.log("abdullah");
    // console.log(req);
    const name = req.body.name;
    const email = req.body.email;
    const body = req.body.body;
    const postId = req.body.postId
   

    Comment.create({
        name: name,
        email: email,
        body: body,
        postId: postId

    })
    .then(result=>{
        console.log("Created New Comment");
        res.status(201).send(result);
    })
    .catch(err=>{
      
        res.status(500).send("error");
    })
}

exports.deleteComment = (req,res,next)=>{
    console.log("abdullah From delete");
    const commentId = req.params.id;
    Comment.findByPk(commentId)

    .then(comment=>{
        return comment.destroy();
    })
    .then(result =>{
        console.log("Deleted");
        res.send(result);
    })
    .catch(err=>{
        res.status(500).send("error");
    })
}


exports.updateComment= (req,res,next)=>{
    const commentId = req.params.id;

    const updatedBody = req.body.body;

    Comment.findByPk(commentId)
    .then(comment=>{
        comment.body = updatedBody
        return comment.save()
    })
    .then(result=>{
        res.status(204).send(result);
        console.log("updated");
    })
    .catch(err=>{
        res.status(500).send("error");
    });
}