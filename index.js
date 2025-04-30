const express = require("express");

var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);


var io = require("socket.io")(server, {
    cors: { origin: "*" }
})



app.use(express.json());
var clients = {};


//middleware
// Middleware to extract token before connection is established
io.use((socket, next) => {
    try {
        // console.log("socket middleware called", socket)
        const token = socket.handshake.headers['authorization'];
        console.log("token", token)
        socket.token = token; // Attach it to the socket object
        next();
    } catch (error) {
        console.log("error", error)
        next();
    }
});

io.on("connection", (socket) => {


    console.log("Connected");
    console.log(socket.id, "has joined");
    console.log(socket.token)
    clients[socket.token] = socket;
    Object.entries(clients).forEach(([key, client]) => {
        console.log(`Key: ${key}, ID: ${client.id}`);
    });

    // socket.on("signIn", (id) => {
    //     console.log(id)
    //     clients[id] = socket;
    //     Object.entries(clients).forEach(([key, client]) => {
    //         console.log(`Key: ${key}, ID: ${client.id}`);
    //     });
    // });

    socket.on("message", (msg) => {
        Object.entries(clients).forEach(([key, client]) => {
            console.log(`Key: ${key}, ID: ${client.id}`);
        });
        let targetId = msg["targetId"];
        console.log(msg);
        if (clients[targetId]) clients[targetId].emit("message", msg)

    });


});

server.listen(port, "0.0.0.0", () => {
    console.log("Server started");
});

