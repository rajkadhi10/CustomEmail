class Connection {
    constructor() {
        this.mockData = []
    }
    create(value) {
        this.mockData.push(value);
        return "Created";
    }

    findAll() {
        return this.mockData;
    }
    update() {
        return "updated";
    }
    destroy() {
        return "deleted";
    }
}
const con = new Connection()
module.exports = con;