const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");

const server = require('../app');
const sequelize = require('../connect-database/database');


chai.should();

chai.use(chaiHttp);

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');


describe("comment Page API", () => {
    //post get all post api
    after((done) => {

        Post.destroy({ where: {} });
        User.destroy({ where: {} });
        Comment.destroy({ where: {} });


        sequelize.query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='users'");
        sequelize.query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='posts'");
        sequelize.query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='comments'");
        console.log("deleeeeeeeeeeeeeeted");



        done();

    })
    describe("GET /comment", () => {


        before((done) => {
            User.create({
                name: "test",
                email: "a@a.com",
                username: "tesssssssssst"
            }).then(() => {

                Post.create({
                    title: "test",
                    body: "body",
                    userId: 1
                })

            })
            done();

        })
        beforeEach((done) => {



            Comment.create({
                name: "test",
                email: "a@a.com",
                body: "tet",
                postId: 1

            })
            done();

        })

        it("should get all comments", (done) => {
            chai.request(server)
                .get('/comments')
                .end((err, res) => {
                    res.should.have.status(200)
                    done();
                })
        })

        it("should not get all comments", (done) => {
            chai.request(server)
                .get('/commentsssss')
                .end((err, res) => {
                    res.should.have.status(404)
                    done();
                })
        })



        describe("delete /delete-comment/:id", () => {
            const commentId = 2
            it("should delete comment", (done) => {
                chai.request(server)
                    .delete('/delete-comment/' + commentId)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        done();
                    })
            });
        })


        describe("put /update-comment", () => {


            const commentId = 3;
            const comment = {
                body: "new comment",

            }
            it("should update comment", (done) => {
                chai.request(server)
                    .put('/update-comment/' + commentId)
                    .send(comment)
                    .end((err, res) => {
                        res.should.have.status(204)
                        res.body.should.be.a('object');
                        done();
                    })
            });

        })



        describe("post /add-comment", () => {

            const comment = {
                postId: 1,
                name: "abdullah",
                body: "test1111111111",
                email: "s@s.com"

            }
            it("should insert comment", (done) => {
                chai.request(server)
                    .post('/add-comment')
                    .send(comment)
                    .end((err, res) => {
                        res.should.have.status(201)
                        res.body.should.be.a('object');
                        done();
                    })
            });

        })






    });


    describe("test failing post API", () => {
        // Test findAll
        it("should return error", (done) => {
            const findAllStub = sinon.stub(Comment, "findAll").returns(Promise.reject());

            chai
                .request(server)
                .get("/comments")
                .end((err, res) => {
                    sinon.assert.calledWith(findAllStub);
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    findAllStub.restore();
                });
        });


        // test create
        // it("should return error", (done) => {
        //     const createStub = sinon.stub(Comment, "create").returns(Promise.reject());

        //     const comment = {
        //         name: "abdullah",
        //         body: "test1111111111",
        //         email: "s@s.com",
        //         postId: "4"
        //     }
        //     chai
        //         .request(server)
        //         .post("/add-comment")
        //         .send(comment)
        //         .end((err, res) => {
        //             sinon.assert.calledWith(createStub, {
        //                 name: "abdullah",
        //                 body: "test1111111111",
        //                 email: "s@s.com",
        //             });
        //             res.should.have.status(500);
        //             res.text.should.be.equal("error");
        //             done();
        //             createStub.restore();
        //         });
        // });

        it("should return error", (done) => {
            const createStub = sinon.stub(Comment, "create").returns(Promise.reject());

            const comment = {
                name: "updated-comment",
                email:'a@a.com',
                body: "updated-body",
                postId: "1",

            }
            chai
                .request(server)
                .post("/add-comment")
                .send(comment)
                .end((err, res) => {
                    sinon.assert.calledWith(createStub, comment);
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    // createStub.restore();
                });
        });

        // test findByPk
        it("should return error", (done) => {
            const findByPkStub = sinon.stub(Comment, "findByPk").returns(Promise.reject());

            chai
                .request(server)
                .put("/update-comment/" + 1)
                .end((err, res) => {
                    sinon.assert.calledWith(findByPkStub, "1");
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    findByPkStub.restore();
                });
        });
        // test findByPk for delete
        it("should return error", (done) => {
            const findByPkStub = sinon.stub(Comment, "findByPk").returns(Promise.reject());

            chai
                .request(server)
                .delete("/delete-comment/" + 1)
                .end((err, res) => {
                    sinon.assert.calledWith(findByPkStub, "1");
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    findByPkStub.restore();

                });
        });






    });







});