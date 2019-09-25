const expect = require('chai').expect
const EmailService = require("../service/EmailService")
const mockRequest = require("../mocks/request").request;
const mockResponse = require("../mocks/response").response;
const sinon = require("sinon");
const emailService = new EmailService();
const con = require("../mocks/connection")
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
let reqEmail=new mockRequest(reqMail)
let res = new mockResponse();



describe("/addDetails", () => {
    context("Add Email Details Success", () => {
        let addEmailDetailsResponse;
        before(async () => {
            addEmailDetailsResponse = await emailService.addEmailDetails(req, res, con);
        })
        it("should return status ok", async () => {
            expect(res.statusCode).to.be.equal(200);
        });
        it("mock data created", async () => {
            expect(addEmailDetailsResponse).to.be.equal("Created");
        });
    })
    context("Add Email Details Error", () => {
        let addEmailDetailsResponse;
        before(async () => {
            addEmailDetailsResponse = await emailService.addEmailDetails(reqWithoutBody, res, con);
        })
        it("should return status 404 if body not defined", async () => {
            expect(res.statusCode).to.be.equal(404);
        });
    })

});



describe("/getDetails", () => {

    context("Get Email Details Success", () => {
        let getEmailDetailsResponse;
        before(async () => {
            getEmailDetailsResponse = await emailService.getEmailDetails(req, res, con);
        })
        it("should return status ok", async () => {
            expect(res.statusCode).to.be.equal(200);
        });
    });
 
});



describe("/getdetailsbyid", () => {

    context("Success:", () => {
        let getEmailDetailsByIdResponse;
        before(async () => {
            getEmailDetailsByIdResponse = await emailService.getDetailsById(reqWithId, res, con);
        })
        it("should return status ok", async () => {
            expect(res.statusCode).to.be.equal(200);
        });
    });
    context("Error:", () => {
        let getEmailDetailsByIdResponse;
        before(async () => {
            getEmailDetailsByIdResponse = await emailService.getDetailsById(reqWithoutBody, res, con);
        })
        it("should return status error", async () => {
            expect(res.statusCode).to.be.equal(404);
        });
    });
});


describe("/deleteDetails", () => {
    context("Success:", () => {
        let deleteDetailsResponse;
        before(async () => {
            deleteDetailsResponse = await emailService.deleteEmailDetails(reqWithId, res, con);
        })
        it("should return status ok", async () => {
            expect(res.statusCode).to.be.equal(200);
        });
    });
    context("Error:", () => {
        let deleteDetailsResponse;
        before(async () => {
            deleteDetailsResponse = await emailService.deleteEmailDetails(reqWithoutBody, res, con);
        })
        it("should return status error", async () => {
            expect(res.statusCode).to.be.equal(404);
        });
    });
});


describe("/editDetails", () => {
    context("Success:", () => {
        let editDetailsResponse;
        before(async () => {
            editDetailsResponse = await emailService.updateEmailDetails(reqWithId, res, con);
        })
        it("should return status ok", async () => {
            expect(res.statusCode).to.be.equal(200);
        });
        it("should send response", async () => {
            expect(editDetailsResponse).to.be.equal("updated");
        });
    });
    context("Error:", () => {
        let editDetailsResponse;
        before(async () => {
            editDetailsResponse = await emailService.updateEmailDetails(reqWithoutBody, res, con);
        })
        it("should return error", async () => {
            expect(res.statusCode).to.be.equal(404);
        });

    });
});


describe("/sendmail", () => {
    context("Success:", () => {
        let mailResponse;
        let mailTransportStub;
        before(async () => {
            
            mailTransportStub= sinon.stub(emailService.nodemailer,"createTransport").callsFake(()=>{
                return true;
            })

            mailResponse = await emailService.sendmail(reqEmail, res, con);

        })
       
        it("should be true", async () => {
            expect(mailTransportStub.called).to.be.true;
        });
       
       
    });
});
