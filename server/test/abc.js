const request = require('supertest')
const expect = require('chai').expect
const assert=require('chai').assert
const app = require('../server')
const authenticate = require("../config/sequelize_config");


describe("/addDetails", () => {
  it("should edit requested id and return response 200", async () => {
    const res = await request(app).post("/email/addemail").send({
      username:"raj@raj.com",
      password:"abc",
      service:"gmail"
    });
    expect(res.status).to.be.equal(200);
  });
  it("should return error if id not defined", async () => {
    const res = await request(app).post("/email/addemail").send();
    expect(res.status).to.be.equal(404);
  });
});



describe("/getDetails", () => {
  it("should return all users", async () => {
  
    const res = await request(app).get("/email/getemail");
    expect(res.status).to.equal(200);
    // expect(res.body.length).to.equal(2);
  });
});
describe("/getdetailsbyid", () => {
  it("should return a Emaildetails if valid details is passed", async () => {
    const res = await request(app).post("/email/getdetailsbyid").send({
      id: 64
    });;
    expect(res.status).to.equal(200);
    // console.log(res.body);
    expect(res.body[0]).to.have.property("username", "raj@raj.com");
  });
  it("should return 404 if id not valid", async () => {
    const res = await request(app).post("/email/getdetailsbyid").send();
    expect(res.status).to.equal(404);
  });
});

describe("/deleteDetails", () => {
  it("should delete requested id and return response 200", async () => {
    const res = await request(app).post("/email/deletedetails").send({
      id: 50,
    });
   
    expect(res.status).to.be.equal(200);
  });

  it("should return error if id not defined", async () => {
    const res = await request(app).post("/email/deletedetails").send();
    expect(res.status).to.be.equal(404);
  });
});

describe("/editDetails", () => {
  it("should edit requested id and return response 200", async () => {
    const res = await request(app).post("/email/updatedetails").send({
      id: 48,
      username:"sssss",
      password:"abc"
    });
    expect(res.status).to.be.equal(200);
  });
  it("should return error if id not defined", async () => {
    const res = await request(app).post("/email/updatedetails").send();
    expect(res.status).to.be.equal(404);
  });
});


describe("/sendmail", () => {
  it("should send email", async () => {
    const res = await request(app).post("/email/sendmail").send({
      id:19,
      username:"raj_kadhi@yahoo.com",
      receivers:"raj.kadhi10@gmail.com",
      body:"abcd",
      service:"yahoo"
    });
    expect(res.status).to.be.equal(200);
  });
  it("should not send email", async () => {
    const res = await request(app).post("/email/sendmail").send();
    expect(res.status).to.be.equal(404);
  });
});


