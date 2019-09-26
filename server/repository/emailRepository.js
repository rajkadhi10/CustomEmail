class EmailRepo {
    // -----Insert a mail details to the list---------
    async addEmailDetails(body, con) {
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

    // ----------- Get Details by ID --------------
    async getDetailsById(body, con) {
        return await con.findAll({
            where: {
                id: body.id
            }
        });

    }

    // ---------- Update email details -------------
    async updateEmailDetails(body, con) {
        return await con.update(body, {
            where: {
                id: body.id
            }
        });

    }

    // ----------- Delete email from the list ----------------
    async deleteEmailDetails(body, con) {
        return await con.destroy({
            where: {
                id: body.id
            }
        });

    }

    // -------------- Send a mail ------------------
    async sendmail(body, con) {
        return await con.findAll({
            where: {
                id: body.id
            }
        });
    }
}
let emailRepo = new EmailRepo();
module.exports = {
    emailRepo: emailRepo
}