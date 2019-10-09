const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const http = require("http");
const Working = require("../Prototype.js");

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("workersdb").collection("workers");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/api/workers", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, workers){
         
        if(err) return console.log(err);
        res.send(workers);
    });
     
});

app.get("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, user){
               
        if(err) return console.log(err);
        res.send(user);
    });
});
   
app.post("/api/workers", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       var name = req.body.name;
       var age = req.body.age;
       var gender = req.body.gender;
       var experience = req.body.experience;
       var salary = req.body.salary; 
    let worker = { name: name, age: age, gender: gender, experience: experience, salary: salary };
    const collection = req.app.locals.collection;
    collection.insertOne(worker, function(err, result){
               
        if(err) return console.log(err);
        res.send(worker + result);
    });
});

app.put("/api/workers", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    let worker = new Working(req.body.name, req.body.age, req.body.gender, req.body.experience, req.body.salary);
       
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({_id: id}, { $set: {name: req.body.name, age: req.body.age, gender: req.body.gender, experience: req.body.experience, salary: req.body.salary }},
         {returnOriginal: false },function(err, result){
               
        if(err) return console.log(err);     
        const worker = result.value;
        res.send(worker + result);
    });
});

app.delete("/api/workers/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let worker = result.value;
        res.send(worker);
    });
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
/* http.createServer(function (request, response) {
    worker.displayInfo();
    console.log(worker.getObj());

}).listen(3000, "127.0.0.1", function () {
    console.log("Сервер начал прослушивание запросов на порту 3000");
}); */