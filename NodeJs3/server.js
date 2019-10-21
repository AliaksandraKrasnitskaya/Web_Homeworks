var http = require('http');
const dotenv = require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-mongodb');

var model = {
    namespace: "jsreport",
    entityTypes: {
        "BookType": {
            "_id": {
                "type": "Edm.String",
                key: true
            },
            "author": {
                "type": "Edm.String"
            },
            "title": {
                "type": "Edm.String"
            }
        },
        "AudioBookType": {
            "_id": {
                "type": "Edm.String",
                key: true
            },
            "author": {
                "type": "Edm.String"
            },
            "title": {
                "type": "Edm.String"
            },
            "publisher": {
                "type": "Edm.String"
            },
            "fullListeningTime": {
                "type": "Edm.String"
            }
        },
        "TextBookType": {
            "_id": {
                "type": "Edm.String",
                key: true
            },
            "author": {
                "type": "Edm.String"
            },
            "title": {
                "type": "Edm.String"
            },
            "creationDate": {
                "type": "Edm.String"
            },
            "pages": {
                "type": "Edm.Int32"
            }
        }
    },
    

    entitySets: {
        "books": {
            entityType: "jsreport.BookType"
        },
        "audioBooks": {
            entityType: "jsreport.AudioBookType"
        },
        "textBooks": {
            entityType: "jsreport.TextBookType"
        },
    }
};

const url = `mongodb+srv://${process.env.login}:${process.env.password}@cluster-xxdef.mongodb.net/test?retryWrites=true&w=majority`;

var odataServer = ODataServer("http://localhost:3000").model(model);

app.listen(3000, function(req , res){
    console.log("Server is working on port 3000");
});

app.use(cors());

app.use("/", function (req, res) {
    odataServer.handle(req, res);
});


MongoClient.connect(url, function(err, db) {
    odataServer.adapter(Adapter(function(cb) { 
        cb(err, db.db('odata')); 
    })); 
});