const User = require('../models/user');

exports.getUser = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(500).send("error");
        })
};

exports.addUser= (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    User.create({
        name: name,
        email: email,
        username: username
    })
    .then(result=>{
        console.log("Created New Post");
        res.status(201).send(result);
    })
    .catch(err=>{
        res.status(500).send("error");
    })
}

exports.deleteUser = (req,res,next)=>{
    console.log("abdullah From delete");
    const userId = req.params.id;
    User.findByPk(userId)

    .then(user=>{
        return user.destroy();
    })
    .then(result =>{
        console.log("Deleted");
        res.send(result);
    })
    .catch(err=>{
        res.status(500).send("error");
    })
}


exports.updateUser= (req,res,next)=>{
    const userId = req.params.id;

    // const userId = req.body.id;
    const updatedName= req.body.name;
    const updatedEmail = req.body.email;

    User.findByPk(userId)
    .then(user=>{
        user.name = updatedName;
        user.email = updatedEmail;
        return user.save()
    })
    .then(result=>{
        res.status(204).send(result);
        console.log("updated");
    })
    .catch(err=>{
        console.log("update user error");
        res.status(500).send("error");
    });
}