class Request {
     abc(){}

    constructor(body = {}) {
        this.body = body;
    }
}
module.exports = {
    request:Request
};
