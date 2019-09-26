const authenticate = require("../config/sequelize_config");
const connection=authenticate.emailModel;

const EmailService = require("../service/EmailService")

class EmailController {

    async addEmailDetails(req, res) {
        let emailService = new EmailService(connection);
        emailService.addEmailDetails(req, res);
    }
    async getEmailDetails(req, res) {
        let emailService = new EmailService(connection);
        emailService.getEmailDetails(req, res);
    }
    async getDetailsById(req, res) {
        let emailService = new EmailService(connection);
        emailService.getDetailsById(req, res);
    }
    async updateEmailDetails(req, res) {
        let emailService = new EmailService(connection);
        emailService.updateEmailDetails(req, res);
    }
    async deleteEmailDetails(req, res) {
        let emailService = new EmailService(connection);
        emailService.deleteEmailDetails(req, res);
    }
    async sendmail(req, res) {
        let emailService = new EmailService(connection);
        emailService.sendmail(req, res);
    }
}
const emailController = new EmailController();
module.exports = emailController