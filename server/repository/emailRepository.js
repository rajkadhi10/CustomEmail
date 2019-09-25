const authenticate = require("../config/sequelize_config");
class EmailRepo {


    // -----Insert a mail details to the list---------
    async addEmailDetails(body, con) {
        // ------------------ Create row------------------------
        return await con.create(body, {
            validate: true
        });
    }

    // ---------Display list of email details----------
    async getEmailDetails(con) {
        return await con.findAll({
            raw: true,
        });

    }

    // --------------- Get Details by ID ------------------
    async getDetailsById(body, con) {

        console.log("R:"+body.id);
        
        return await con.findAll({
            where: {
                id: body.id
            }
        });

    }

    // ------------------ Update email details ---------------------
    async updateEmailDetails(body, con) {

        return await con.update(body, {
            where: {
                id: body.id
            }
        });

    }
    // ----------------- Delete email from the list ------------------------
    async deleteEmailDetails(body, con) {

        return await con.destroy({
            where: {
                id: body.id
            }
        });

    }

    // --------------------- Send a mail -----------------------
    async sendmail(body, con) {

        // -------------------- Finding password for the user ---------------
        return await con.findAll({
            where: {
                id: body.id
            }
        });
    }
}
let e1 = new EmailRepo();
module.exports = {
    emailRepo: e1
}