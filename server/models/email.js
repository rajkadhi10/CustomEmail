const uuid = require('uuid')
const email = (sequelize, DataTypes) => {
    const email = sequelize.define('email', {
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
    email.beforeCreate(email1 => email1.id_primary = uuid()); // Generates uuid for each row.
    return email;
};


module.exports = email;