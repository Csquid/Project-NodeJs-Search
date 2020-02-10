const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: '',
    password: '1234',
    database: 'ns_db'
}) 

connection.connect();

app.listen(3000, function() {
    console.log("yes! start to 3000 port");
 });

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // res.sendFile(__dirname + "/public/index.html");
    res.render("index", {"data": {}});
});

app.post("/suggest", function(req, res) {
    searchKeywordData = req.body.keyword;

    const dummyData = {
        '가': {
            'writer': 'anonymous',
            'title': '가',
            'star': 2.1
        },
        '가나': {
            'writer': 'black',
            'title': '가나',
            'star': 3
        },
        '가나링': {
            'writer': 'gana',
            'title': '가나링',
            'star': 4
        },
        '가위': {
            'writer': 'ghost',
            'title': '가위',
            'star': 5
        },
        '코로나': {
            'writer': 'korean',
            'title': '코로나',
            'star': 5
        },
        '위가나': {
            'writer': 'bono',
            'title': '위가나',
            'star': 1
        }
    }

    const dontFoundData = -1;
    let sendData = {};
    
    let responseData = {
        'signal': '',
        'detail': {
            'data': {},
            'err': ''
        }
    };

    if(searchKeywordData !== "") {
        responseData['signal'] = 'success';
        responseData['detail']['data']['searchKeyword'] = searchKeywordData;

        sendData["length"] = 0;
        Object.keys(dummyData).forEach(function(key) {
            // console.log(key + ": " + dummyData[key]);
            
            if((key.indexOf(searchKeywordData) != dontFoundData) && (key.charAt(0) == searchKeywordData.charAt(0))) {
                sendData[key] = dummyData[key];
                sendData["length"] += 1;
            }
        });

        responseData['detail']['data']['result'] = sendData;
    } else {
        responseData['signal'] = 'fail';
        responseData['detail']['err'] = 'value is null';
    }

    res.json(responseData);
    // res.render("index.ejs", {"data": responseData});
});