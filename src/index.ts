//Import de deux types depuis la librairie HTTP
import {IncomingMessage, ServerResponse} from 'http';


//Recuperation de la variable d'environnement
const envVar = process.env.PING_LISTEN_PORT;


var http = require('http');
var os = require("os");

console.log("Starting HTTP Server..")


http.createServer(function (req: IncomingMessage, res : ServerResponse) {

    //Recupere la route actuelle
    var route = req.url
    
    try{
    if (req.method === "GET"){
        switch (route) {
            case '/ping':
              res.setHeader("Content-Type", "application/json")
              res.write(JSON.stringify(req.headers))
              console.log(os.hostname())
              res.end();
              break;
            default:
                res.statusCode = 404
                res.end()
          }
    }
    } catch(error){
        console.error(error)
        res.statusCode = 500
        res.end()
    }
}).listen(envVar);