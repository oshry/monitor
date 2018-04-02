var http = require('http');
var express = require('express');
var app = express();
var Storage = require('./storage.js');

var server = http.createServer(app);
// Pass a http.Server instance to the listen method
var io = require('socket.io').listen(server);

// The server should start listening
server.listen(3333);

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Register the index route of your app that returns the HTML file
app.get('/', (req, res) => {
    console.log("Homepage");
    res.sendFile(__dirname + '/index.html');
});

// Expose the node_modules folder as static resources (to access socket.io.js in the browser)
app.use('/', express.static('server/dist/'));
// Handle connection
io.on('connection', (socket) => {
    console.log("Connected succesfully to the socket ...");
    //storage data in db
    var storage = new Storage();
    socket.on('first', (data) => {
        //unique?
        storage.isUnique(data);
        storage.save(data);
    });
    socket.on('click', (data) => {
        storage.save(data);
    });
    socket.on('mousemove', (data) => {
        storage.save(data);
    });
    socket.on('input', (data) => {
        storage.save(data);
    });
});