"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envVar = process.env.PING_LISTEN_PORT;
var http = require('http');
http.createServer(function (req, res) {
    //Recupere la route actuelle
    var route = req.url;
    try {
        if (req.method === "GET") {
            switch (route) {
                case '/ping':
                    res.setHeader("Content-Type", "application/json");
                    res.write(JSON.stringify(req.headers));
                    res.end();
                    break;
                default:
                    res.statusCode = 404;
                    res.end();
            }
        }
    }
    catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    }
}).listen(envVar);
