const authenticate = require('../config/sequelize_config');
const nodemailer = require('nodemailer');
class Email {

    // -----Insert a mail details to the list---------
    async addEmailDetails(req, res) {
        try {
            console.log(req.body)
            await authenticate.emailModel.create(req.body, {
                validate: true
            });
            console.log("Data added");
            res.status(200).json({
                message: "Added"
            });
        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "wrong data"
            });
        }
    }

    // ---------Display list of email details----------
    async getEmailDetails(req, res) {
        try {
            let notes = await authenticate.emailModel.findAll({
                raw: true,
            });
            console.log(notes);
            res.status(200).json(notes);
        } catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Error to fetch data"
            });
        }
    }
    // --------------- Get Details by ID ------------------
    async getDetailsById(req, res) {
        try {
            let notes = await authenticate.emailModel.findAll({
                where: {
                    id: req.body.id
                }
            });
            console.log(notes);
            res.status(200).json(notes);
        } catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Error to fetch data"
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

            console.log("Data updated");
            res.status(200).json({
                message: "Updated"
            });
        } catch (error) {
            console.log(error);
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
            console.log(err);
            res.status(404).json({
                message: "Can not delete contact"
            });
        }
    }


    // --------------------- Send a mail -----------------------
    async sendmail(req, res) {
        const transporter = nodemailer.createTransport({
            service: req.body.service,
            auth: {
                user: req.body.username,
                pass: req.body.pass
            }
        })
        const mailOptions = {
            from: req.body.username,
            to: req.body.receivers,
            subject: req.body.subject
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.send("fail");             // ----------------Fail to send email ------------
            } else {
                res.send("success");         // -------------- Mail sent ----------------
            }
        });
    }
}
const email = new Email();
module.exports = email;