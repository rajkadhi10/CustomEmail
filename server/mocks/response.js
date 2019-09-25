
class ServerResponse {

    constructor() {
        this.statusCode = 0;
        this._responseText = [];
    }
    get responseText() {
        return this._responseText.join('');
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    send(data) {
        this._responseData = data;
        return this;
    }

    json(value) {
        this._responseText.push(JSON.stringify(value));
        return this;
    }
}

module.exports = {
    response:ServerResponse
};
