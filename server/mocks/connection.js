class Connection {
    constructor(){
        this.mockData=[]
    }
    create(value) {
        this.mockData.push(value);
        return "Created";
    }

    findAll() {
       return this.mockData;
    }
    update(){
        return "updated";
    }
    destroy(){
        return "deleted";
    }
    // send(data) {
    //     this._responseData = data;
    //     return this;
    // }

    // json(value) {
    //     this._responseText.push(JSON.stringify(value));
    //     return this;
    // }
}
const con=new Connection()
module.exports = con;
