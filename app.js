const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router/index")

app.listen(3000, function() {
    console.log("yes! start to 3000 port");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(router);