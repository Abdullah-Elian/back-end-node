const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require("sinon");

const server = require('../app');
const sequelize = require('../connect-database/database');

const User = require('../models/user');
const Post = require('../models/post');
chai.should();

chai.use(chaiHttp);

describe("Post Page API", () => {
    //post get all post api


    describe("GET /posts", () => {

        after((done) => {

            Post.destroy({ where: {} });
            User.destroy({ where: {} });

            
            sequelize.query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='users'");
            sequelize.query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='posts'");




            done();

        })

        beforeEach((done) => {

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



        it("should get all posts", (done) => {

            console.log("abdullah");
            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(200)
                })
            done();

        })

        it("should not get all posts", (done) => {
            chai.request(server)
                .get('/postsss')
                .end((err, res) => {
                    res.should.have.status(404)
                    done();
                })
        })



            describe("delete /delete-user/:id", () => {
              const postId =3
                it("should delete post", (done) => {
                    chai.request(server)
                        .delete('/delete-post/' + postId)
                        .end((err, res) => {
                            res.should.have.status(200);
                            // res.body.should.be.a('object');
                            done();
                        })
                });
            });


        describe("put /update-post", () => {


           const postId = 4;
            const post = {
                title: "pppppppp",
                body: "post2",

            }
            it("should update post", (done) => {
                chai.request(server)
                    .put('/update-post/' + postId)
                    .send(post)
                    .end((err, res) => {
                        res.should.have.status(204)
                        res.body.should.be.a('object');
                        done();
                    })
            });

        })



        describe("post /add-post", () => {


            const post = {
                userId: 5,
                title: "abdullah",
                body: "test1111111111",

            }
            it("should insert post", (done) => {
                chai.request(server)
                    .post('/add-post')
                    .send(post)
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
            const findAllStub = sinon.stub(Post, "findAll").returns(Promise.reject());
    
            chai
                .request(server)
                .get("/posts")
                .end((err, res) => {
                    sinon.assert.calledWith(findAllStub);
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    findAllStub.restore();
                });
        });
    
    
        // test create
        it("should return error", (done) => {
            const createStub = sinon.stub(Post, "create").returns(Promise.reject());
    
            const post = {
                userId: 5,
                title: "abdullah",
                body: "test1111111111",
    
            }
            chai
                .request(server)
                .post("/add-post")
                .send(post)
                .end((err, res) => {
                    sinon.assert.calledWith(createStub, post);
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    createStub.restore();
                });
        });
    
        // test findByPk
        it("should return error", (done) => {
            const findByPkStub = sinon.stub(Post, "findByPk").returns(Promise.reject());
    
            chai
                .request(server)
                .put("/update-post/" + 1)
                .end((err, res) => {
                    sinon.assert.calledWith(findByPkStub, "1");
                    res.should.have.status(500);
                    res.text.should.be.equal("error");
                    done();
                    findByPkStub.restore();
                });
        });
    
        // beforeEach(() => {
        //     sandbox = sinon.createSandbox();
        //     // mockObj = sandbox.stub(testApp, 'getObj', fake_function)
        // });
    
        // afterEach(() => {
        //     sandbox.restore();
        // });
    
        // test findByPk for delete
        it("should return error", (done) => {
            const findByPkStub = sinon.stub(Post, "findByPk").returns(Promise.reject());
    
            chai
                .request(server)
                .delete("/delete-post/" + 1)
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


