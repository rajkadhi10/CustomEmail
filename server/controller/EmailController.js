const EmailService = require("../service/EmailService")

class EmailController {
    async addEmailDetails(req, res) {
        (new EmailService).addEmailDetails(req, res);
    }
    async getEmailDetails(req, res) {
        (new EmailService).getEmailDetails(req, res);
    }
    async getDetailsById(req, res) {
        (new EmailService).getDetailsById(req, res);
    }
    async updateEmailDetails(req, res) {
        (new EmailService).updateEmailDetails(req, res);
    }
    async deleteEmailDetails(req, res) {
        (new EmailService).deleteEmailDetails(req, res);
    }
    async sendmail(req, res) {
        (new EmailService).sendmail(req, res);
    }
}
const emailController = new EmailController();
module.exports = emailController