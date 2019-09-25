
const emailRepo = require('../repository/emailRepository').emailRepo

class Email {


    constructor(){
        this.emailRepo=emailRepo
    }

    // -----Insert a mail details to the list---------
    async addEmailDetails(req, res) {
        let result = emailRepo.addEmailDetails(req, res);
        return result;
    }

    // ---------Display list of email details----------
    async getEmailDetails(req, res) {
        let result = emailRepo.getEmailDetails(req, res);
        return result;
    }

    // --------------- Get Details by ID ------------------
    async getDetailsById(req, res) {
        let result = emailRepo.getDetailsById(req, res);
        return result;
    }

    // ------------------ Update email details ---------------------
    async updateEmailDetails(req, res) {
        let result = emailRepo.updateEmailDetails(req, res);
        return result;
    }

    // ----------------- Delete email from the list ------------------------
    async deleteEmailDetails(req, res) {
        let result = emailRepo.deleteEmailDetails(req, res);
        return result;
    }


    // --------------------- Send a mail -----------------------
    async sendmail(req, res) {
        let result = emailRepo.sendmail(req, res);
        return result;
    }
}
const email = new Email();
module.exports = email;