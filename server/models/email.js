const uuid = require("uuid")
const email = (sequelize, DataTypes) => {
    const email = sequelize.define("email", {
        id_primary: {
            type: DataTypes.UUID,
            defaultValue: uuid()
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.STRING
        },
        service: {
            type: DataTypes.STRING
        },
    });
    // Generates uuid for each row.
    email.beforeCreate(email1 => email1.id_primary = uuid());
    return email;
};


module.exports = email;