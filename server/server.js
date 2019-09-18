const express = require("express");
const bodyParser = require("body-parser");
const route_config = require("./routes/route_config");
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE ")
    next();
});
app.use("/email", route_config);
let port = 3000;
app.listen(port, () => {
    console.log("Server is up and running on port numner " + port);
});