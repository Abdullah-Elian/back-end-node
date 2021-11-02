const chai = require('chai');
const chaiHttp = require('chai-http');
var sinon = require("sinon");
const server = require('../app');
const sequelize = require('../connect-database/database');

const User = require('../models/user');

chai.should();

chai.use(chaiHttp);

describe("User API", () => {
    //user get all user api
    describe("GET /users", () => {

        after((done) => {

            User.destroy({ truncate : true, where: {} });
            sequelize.query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='users'");


            done();

        })


        beforeEach((done) => {

            User.create({
                name: "test",
                email: "a@a.com",
                username: "tesssssssssst"
            })
            done();

        })

        it("should get all users", (done) => {

            // User.create({
            //     name: "test",
            //     email: "a@a.com",
            //     username: "tesssssssssst"
            // }).then(result => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    console.log(res);
                    res.should.have.status(200)
                    done();
                })

            // })

        })

        it("should not get all users", (done) => {
            chai.request(server)
                .get('/userssss')
                .end((err, res) => {
                    res.should.have.status(404)
                    done();
                })
        })


        describe("post /add-user", () => {

            const user = {
                name: "abdullah",
                email: "a@chai.com",
                username: "haha",

            }
            it("should insert user", (done) => {
                chai.request(server)
                    .post('/add-user')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(201)
                        res.body.should.be.a('object');
                        done();
                    })
            });

        })


        describe("delete /delete-user/:id", () => {

            it("should delete user", (done) => {

                // User.create({
                //     name: "test",
                //     email: "a@a.com",
                //     username: "tesssssssssst"
                // }).then(result => {
                const userId = 4

                chai.request(server)
                    .delete('/delete-user/' + userId)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        done();
                    })
                // })
            });







        })


        describe("put /update-user", () => {


            it("should updtae user", (done) => {
                const user = {
                    name: "teeeeeeeeeeeeeeest",
                    email: "test@test.com"
                }
                const userId = 5;
                chai.request(server)
                    .put('/update-user/' + userId)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(204)
                        res.body.should.be.a('object');
                        done();
                    })
            });

        })



        describe("test failing user API", () => {
            // Test findAll
            it("should return error", (done) => {
                const findAllStub = sinon.stub(User, "findAll").returns(Promise.reject());

                chai
                    .request(server)
                    .get("/users")
                    .end((err, res) => {
                        sinon.assert.calledWith(findAllStub);
                        res.should.have.status(500);
                        res.text.should.be.equal("error");
                        done();
                    });
            });


            // test create
            it("should return error", (done) => {
                const createStub = sinon.stub(User, "create").returns(Promise.reject());

                const user = {
                    name: "abdullah",
                    email: "a@chai.com",
                    username: "haha",

                }
                chai
                    .request(server)
                    .post("/add-user")
                    .send(user)
                    .end((err, res) => {
                        sinon.assert.calledWith(createStub, user);
                        res.should.have.status(500);
                        res.text.should.be.equal("error");
                        done();
                    });
            });

            // test findByPk
            it("should return error", (done) => {
                const findByPkStub = sinon.stub(User, "findByPk").returns(Promise.reject());

                chai
                    .request(server)
                    .put("/update-user/" + 1)
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
                const findByPkStub = sinon.stub(User, "findByPk").returns(Promise.reject());

                chai
                    .request(server)
                    .delete("/delete-user/" + 1)
                    .end((err, res) => {
                        sinon.assert.calledWith(findByPkStub, "1");
                        res.should.have.status(500);
                        res.text.should.be.equal("error");
                        done();
                    });
            });






        });










    });
});