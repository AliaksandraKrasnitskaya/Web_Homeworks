const http = require("http");
const Working = require("./Prototype.js");

let worker = new Working('Oleg', 24, 'Male', 2, 2500);

worker.displayInfo();
console.log(worker.getObj());

/* http.createServer(function (request, response) {
    worker.displayInfo();
    console.log(worker.getObj());

}).listen(3000, "127.0.0.1", function () {
    console.log("Сервер начал прослушивание запросов на порту 3000");
}); */