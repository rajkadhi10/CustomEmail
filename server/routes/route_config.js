const express = require("express");
const router = express.Router();

const email_controller = require("../controller/EmailController");



router.post("/addemail", email_controller.addEmailDetails);
router.get("/getemail", email_controller.getEmailDetails);
router.post("/getdetailsbyid", email_controller.getDetailsById);
router.post("/updatedetails", email_controller.updateEmailDetails);
router.post("/deletedetails", email_controller.deleteEmailDetails);
router.post("/sendmail", email_controller.sendmail);


module.exports = router;