// const Sequelize = require('sequelize')

// // const sequelize = new Sequelize(
// //     "node-backend",
// //     "postgres",
// //     "123",
// //     {
// //         host: "localhost",
// //         dialect: "postgres"
// //     }
// // );

// const sequelize = new Sequelize('test_db', 'user', 'pass', {
//     dialect: 'sqlite',
//     // host: ':memory:'
//     host: './dev.sqlite'

// })



const Sequelize = require('sequelize')

require('dotenv').config()


const sequelize = new Sequelize({
database:process.env.DB_NAME,
username:process.env.DB_USER,
password:process.env.DB_PASSWORD,
host: process.env.DB_HOST,
dialect: process.env.DB_DILECT,
// Storage: ":memory"
});

console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",process.env.DB_DILECT);






// var sequelize = new Sequelize(
//     "database",
//     process.env.DB_USER,
//     process.env.PASSWORD,
//     {
//       host: process.env.DB_HOST,
//       dialect: process.env.DB_DILECT,
//       pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//       },
//       // Data is stored in the file `database.sqlite` in the folder `db`.
//       // Note that if you leave your app public, this database file will be copied if
//       // someone forks your app. So don't use it to store sensitive information.
//       storage: "/sandbox/src/db/database.sqlite"
//     }
//   );

module.exports = sequelize;