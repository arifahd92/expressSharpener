
/*
//****************** while using mysql ******************
const mysql = require("mysql2")
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "first_schema",
    password: "@Arif3198"
})
module.exports = pool.promise()
*/
//******************************************************** */

//sequelize is an Object Relational Mapping Library

const Sequelize = require("sequelize")// it will return a class 

// going to create an an instace of that class with constructor data ,it will create a pool and will do more things
const sequelize = new Sequelize("database", "root", "@Arif3198", {
    dialect: "mysql",
    host: "localhost"
})


module.exports = sequelize