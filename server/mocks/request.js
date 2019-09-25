class IncomingMessage {
     abc(){}

    constructor(body = {}) {
        this.body = body;
    }
}
module.exports = {
    request:IncomingMessage
};
