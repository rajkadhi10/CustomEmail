import axios from "axios";
class EmailService {
  async getEmails() {
    return axios
      .get("http://localhost:3000/email/getemail")
      .then(res => res.data);
  }
  async addEmail(emailDetails) {
    return axios
      .post("http://localhost:3000/email/addemail", emailDetails)
      .then(res => res.data);
  }
  async getDetailsById(id) {
    return axios
      .post("http://localhost:3000/email/getdetailsbyid", id)
      .then(res => res.data);
  }
  async updateDetails(updateDetails) {
    return axios
      .post("http://localhost:3000/email/updatedetails", updateDetails)
      .then(res => res.data);
  }
  async deleteDetails(deleteDetail) {
    return axios
      .post("http://localhost:3000/email/deletedetails", deleteDetail)
      .then(res => res.data);
  }
  async sendEmail(composeDetails) {
    return axios
      .post("http://localhost:3000/email/sendmail", composeDetails)
      .then(res => res.data);
  }
}
const emailService = new EmailService();
export default emailService;