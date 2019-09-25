const Sequelize = require("sequelize");
const email = require("../models/email")


const sequelize = new Sequelize("emaildb", "postgres", "postgres", {
    host: "192.1.200.69",
    dialect: "postgres",
    define: {
        timestamps: false
    },
    logging: false,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate().then(() => {
}).catch((err) => {
    console.log(err);
});

const emailModel = email(sequelize, Sequelize)

sequelize.sync({
    force: false
}).then(() => {
    // console.log("Db and Tables Created");
});

module.exports = {
    emailModel,
    sequelize
}