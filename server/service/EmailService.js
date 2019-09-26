const authenticate = require("../config/sequelize_config");
const nodemailer = require("nodemailer")
const crypto = require("crypto"),
    algorithm = "aes-256-ctr",
    password = "helloraj";
const emailRepo = require('../repository/emailRepository').emailRepo

class Email {

    constructor() {
        this.emailRepo = emailRepo;
        this.connection = authenticate.emailModel;
        this.nodemailer = nodemailer
    }

    // -----Insert a mail details to the list---------
    async addEmailDetails(req, res, con) {
        try {
            if (con !== undefined)
                this.connection = con;
            // ------------------------- password encryption -------------------
            let cipher = crypto.createCipher(algorithm, password)
            let crypted = cipher.update(req.body.password, "utf8", "hex")
            crypted += cipher.final("hex");
            req.body.password = crypted;

            const result = await emailRepo.addEmailDetails(req.body, this.connection);

            res.status(200).json({
                message: "Added"
            });
            return result;
        } catch (error) {
            res.status(404).json({
                message: "wrong data"
            });
        }

    }

    // ---------Display list of email details----------
    async getEmailDetails(req, res, con) {
        if (con !== undefined)
            this.connection = con;

        const result = await emailRepo.getEmailDetails(this.connection);

        res.status(200).json(result);
        return result;

    }

    // --------------- Get Details by ID ------------------
    async getDetailsById(req, res, con) {
        try {
            if (con !== undefined)
                this.connection = con;
            if (req.body.id == undefined)
                throw Error;

            const emailListByID = await emailRepo.getDetailsById(req.body, this.connection);

            res.status(200).send(emailListByID[0].dataValues);
        } catch (err) {
            res.status(404).json({
                message: "Error to fetch data by id"
            });
        }
        return res;
    }

    // ------------------ Update email details ---------------------
    async updateEmailDetails(req, res, con) {
        try {
            if (con !== undefined)
                this.connection = con;
            if (req.body.id == undefined)
                throw Error

            // ------------------ Password encryption -----------------
            let cipher = crypto.createCipher(algorithm, password)
            let crypted = cipher.update(req.body.password, "utf8", "hex")
            crypted += cipher.final("hex");
            req.body.password = crypted;

            let result = await emailRepo.updateEmailDetails(req.body, this.connection);

            res.status(200).json({
                message: "Updated"
            });
            return result;
        } catch (error) {
            res.status(404).json({
                message: "wrong data"
            });
        }
    }

    // ----------------- Delete email from the list ------------------------
    async deleteEmailDetails(req, res, con) {
        try {
            if (con !== undefined)
                this.connection = con;
            if (req.body.id == undefined)
                throw Error;

            let result = await emailRepo.deleteEmailDetails(req.body, this.connection);

            res.status(200).send("Deleted")
            return result;
        } catch (err) {
            res.status(404).json({
                message: "Can not delete contact"
            });
        }

    }


    // --------------------- Send a mail -----------------------
    async sendmail(req, res, con) {
        try {
            // console.log(this.connection);
            this.connection = authenticate.emailModel
            if (con !== undefined)
                this.connection = con;

            let notes = await emailRepo.sendmail(req.body, this.connection)

            // -------------------- Decrypt the password -------------------------
            let decipher = crypto.createDecipher(algorithm, password)
            let decryptedPassword = decipher.update(notes[0].password, "hex", "utf8")
            decryptedPassword += decipher.final("utf8");

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
                if (!err) {
                    // -------------- Email sent ----------------
                    res.status(200).send("success");
                }
                else{
                    // ---------- Fail to send -----------
                    res.status(200).send("Fail");
                }
            });
        } catch (err) {
            res.status(404).send("Can't send email");
        }
        return res;
    }
}
module.exports = Email;