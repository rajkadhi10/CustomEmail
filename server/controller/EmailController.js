const EmailService = require("../service/EmailService")

class EmailController {
    async addEmailDetails(req, res) {
        let emailService = new EmailService();
        emailService.addEmailDetails(req, res);
    }
    async getEmailDetails(req, res) {
        let emailService = new EmailService();
        emailService.getEmailDetails(req, res);
    }
    async getDetailsById(req, res) {
        let emailService = new EmailService();
        emailService.getDetailsById(req, res);
    }
    async updateEmailDetails(req, res) {
        let emailService = new EmailService();
        emailService.updateEmailDetails(req, res);
    }
    async deleteEmailDetails(req, res) {
        let emailService = new EmailService();
        emailService.deleteEmailDetails(req, res);
    }
    async sendmail(req, res) {
        let emailService = new EmailService();
        emailService.sendmail(req, res);
    }
}
const emailController = new EmailController();
module.exports = emailController