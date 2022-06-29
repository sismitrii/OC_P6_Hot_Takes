const http = require('http'); // how include https ?
const app = require('./app');

/* === Return a valid port === */
function normalizePort(port){
    const numberPort = parseInt(port, 10);

    /*if (isNaN(port)) {
      return val;
    }*/
    if (numberPort >= 0) { //if a negative port is possible 
      return numberPort;
    }
    console.log("Wrong PORT value");
    return false;
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)// to give to express app on which port is it going to run
// J'ai testé ça fonctionne sans donc pourquoi le mettre..
const server = http.createServer(app);

server.listen(port); // process.env.PORT = port par defaut proposé par la plateforme de developpement