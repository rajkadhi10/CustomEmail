const request = require('supertest')
const expect = require('chai').expect
const app = require('../server')
const emailController = require("../controller/EmailController")
const mockRequest = require("../mocks/request").request;
const mockResponse = require("../mocks/response").response;
const sinon = require("sinon");
const sandbox = sinon.createSandbox();

let mockData = {
    username: "raj@raj.co.in",
    password: "abcd",
    service: "email"
}
let mockDataWithId = {
    id: 91,
    username: "abc@abc.com",
    password: "abcde",
    service: "yahoooooo"
}

let reqMail = {
    id: 19,
    username: "raj_kadhi@yahoo.com",
    receivers: "raj.kadhi10@gmail.com",
    body: "abcd",
    service: "yahoo"

}
let req = new mockRequest(mockData);
let reqWithId = new mockRequest(mockDataWithId)
let reqWithoutBody = new mockRequest();
let res = new mockResponse();



describe("/addDetails", () => {
    let addEmailDetailsStub;
    let addEmailDetailsResponse;
    before(async () => {
        addEmailDetailsStub = sinon.stub(emailController.emailRepo, "addEmailDetails").callsFake(async (req, res) => {
            return true;
        });
        addEmailDetailsResponse = await emailController.addEmailDetails();
    })
    it("should call email details", async () => {
        expect(addEmailDetailsStub.called).to.be.true;
        expect(addEmailDetailsResponse).to.be.true;

    });
    after(() => {
        addEmailDetailsStub.restore();
    })
    // it("should return error if id not defined", async () => {
    //     await emailController.addEmailDetails(reqWithoutBody, res);
    //     expect(res.statusCode).to.be.equal(404);
    // });
});



describe("/getDetails", () => {
    let getEmailDetailsStub;
    let getEmailDetailsResponse;
    before(async () => {
        getEmailDetailsStub = sinon.stub(emailController.emailRepo, "getEmailDetails").callsFake(async (req, res) => {
            return true;

        });
        getEmailDetailsResponse = await emailController.getEmailDetails(reqWithoutBody, res);
    })
    it("should return all users", async () => {
        expect(getEmailDetailsStub.called).to.be.true;
        expect(getEmailDetailsResponse).to.be.true;

    });
    after(() => {
        getEmailDetailsStub.restore();
    })

    // it("should return all users", async () => {
    //     await emailController.getEmailDetails(req, res);
    //     expect(res.statusCode).to.equal(200);
    // });

});


describe("/getdetailsbyid", () => {
    let getEmailDetailsByIdStub;
    let getEmailDetailsByIdResponse;
    before(async () => {
        getEmailDetailsByIdStub = sinon.stub(emailController.emailRepo, "getDetailsById").callsFake(async (req, res) => {
            return true;

        });
        getEmailDetailsByIdResponse = await emailController.getDetailsById();
    })
    it("should return all users", async () => {
        expect(getEmailDetailsByIdStub.called).to.be.true;
        expect(getEmailDetailsByIdResponse).to.be.true;

    });
    after(() => {
        getEmailDetailsByIdStub.restore();
    })
    // it("should return a valid Emaildetails if valid details is passed", async () => {
    //     await emailController.getDetailsById(reqWithId, res);
    //     expect(res.statusCode).to.equal(200);
    //     expect(res._responseData).to.have.property("username", "abc@abc.com");
    // });
    // it("should return 404 if id not valid", async () => {
    //     await emailController.getDetailsById(reqWithoutBody, res);
    //     expect(res.statusCode).to.equal(404);
    // });
});

describe("/deleteDetails", () => {
    let deleteDetailsByIdStub;
    let deleteDetailsResponse;
    before(async () => {
        deleteDetailsByIdStub = sinon.stub(emailController.emailRepo, "deleteEmailDetails").callsFake(async (req, res) => {
            return true;

        });
        deleteDetailsResponse = await emailController.deleteEmailDetails();
    })
    it("should return all users", async () => {
        expect(deleteDetailsByIdStub.called).to.be.true;
        expect(deleteDetailsResponse).to.be.true;

    });
    after(() => {
        deleteDetailsByIdStub.restore();
    })
    // it("should delete requested id and return response 200", async () => {
    //     await emailController.deleteEmailDetails(reqWithId, res);
    //     expect(res.statusCode).to.be.equal(200);
    // });

    // it("should return error if id not defined", async () => {
    //     await emailController.deleteEmailDetails(reqWithoutBody, res);
    //     expect(res.statusCode).to.be.equal(404);
    // });
});

describe("/editDetails", () => {
    let editDetailsStub;
    let editDetailsResponse;
    before(async () => {
        editDetailsStub = sinon.stub(emailController.emailRepo, "updateEmailDetails").callsFake(async (req, res) => {
            return true;

        });
        editDetailsResponse = await emailController.updateEmailDetails();
    })
    it("should return all users", async () => {
        expect(editDetailsStub.called).to.be.true;
        expect(editDetailsResponse).to.be.true;

    });
    after(() => {
        editDetailsStub.restore();
    })
    // it("should edit requested id and return response 200", async () => {
    //     await emailController.updateEmailDetails(reqWithId, res);
    //     expect(res.statusCode).to.be.equal(200);
    // });
    // it("should return error if id not defined", async () => {
    //     await emailController.updateEmailDetails(reqWithoutBody, res);
    //     expect(res.statusCode).to.be.equal(404);
    // });
});

describe("/sendmail", () => {
    let mailStub;
    let mailResponse;
    before(async () => {
        mailStub = sinon.stub(emailController.emailRepo, "sendmail").callsFake(async (req, res) => {
            return true;

        });
        mailResponse = await emailController.sendmail();
    })
    it("should return all users", async () => {
        expect(mailStub.called).to.be.true;
        expect(mailResponse).to.be.true;

    });
    after(() => {
        mailStub.restore();
    })
    // it("should send email", async () => {
    //     const res = await request(app).post("/email/sendmail").send(reqMail);
    //     expect(res.status).to.be.equal(200);
    // });
    // it("should not send email", async () => {
    //     const res = await request(app).post("/email/sendmail").send({
    //         receivers: "",
    //     });
    //     expect(res.status).to.be.equal(404);
    // });
});