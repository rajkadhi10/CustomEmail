const authenticate = require('../config/sequelize_config');
const nodemailer = require('nodemailer');
const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'helloraj';
class Email {

    // -----Insert a mail details to the list---------
    async addEmailDetails(req, res) {
        try {

            // ------------------------- password encryption -------------------
            let cipher = crypto.createCipher(algorithm, password)
            let crypted = cipher.update(req.body.password, 'utf8', 'hex')
            crypted += cipher.final('hex');
            req.body.password = crypted;

            // ------------------ Create row------------------------
            await authenticate.emailModel.create(req.body, {
                validate: true
            });
            res.status(200).json({
                message: "Added"
            });
        } catch (error) {
            res.status(404).json({
                message: "wrong data"
            });
        }
    }

    // ---------Display list of email details----------
    async getEmailDetails(req, res) {
        try {
            let emailList = await authenticate.emailModel.findAll({
                raw: true,
            });
            res.status(200).json(emailList);
        } catch (err) {
            res.status(404).json({
                message: "Error to fetch data"
            });
        }
    }
    // --------------- Get Details by ID ------------------
    async getDetailsById(req, res) {
        try {
            let emailListByID = await authenticate.emailModel.findAll({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json(emailListByID);
        } catch (err) {
            res.status(404).json({
                message: "Error to fetch data by id"
            });
        }
    }
    // ------------------ Update email details ---------------------
    async updateEmailDetails(req, res) {
        try {
            await authenticate.emailModel.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json({
                message: "Updated"
            });
        } catch (error) {
            res.status(404).json({
                message: "wrong data"
            });
        }
    }

    // ----------------- Delete email from the list ------------------------
    async deleteEmailDetails(req, res) {
        try {
            await authenticate.emailModel.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.send("Deleted")
        } catch (err) {
            res.status(404).json({
                message: "Can not delete contact"
            });
        }
    }


    // --------------------- Send a mail -----------------------
    async sendmail(req, res) {
        try {

            // -------------------- Finding password for the user ---------------
            let notes = await authenticate.emailModel.findAll({
                where: {
                    id: req.body.id
                }
            });

            // -------------------- Decrypt the password -------------------------
            let decipher = crypto.createDecipher(algorithm, password)
            let decryptedPassword = decipher.update(notes[0].dataValues.password, 'hex', 'utf8')
            decryptedPassword += decipher.final('utf8');


            // -------------------- Send email [nodemailer methods] ------------------
            const transporter = nodemailer.createTransport({
                service: req.body.service,
                auth: {
                    user: req.body.username,
                    pass: decryptedPassword
                }
            })
            const mailOptions = {
                from: req.body.username,
                to: req.body.receivers,
                subject: req.body.subject,
                text: req.body.body
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    // ----------------Fail to send email ------------
                    res.send("fail");
                } else {
                    // -------------- Email sent ----------------
                    res.send("success");
                }
            });
        } catch (err) {
            res.status(404).json({
                message: "Can't send email"
            });
        }
    }
}
const email = new Email();
module.exports = email;