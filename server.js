/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/

const http = require('http'); 
const app = require('./app');

/*=============================================================*/
/*---------------------- FUNCTIONS ----------------------------*/
/*=============================================================*/

/* === Return a valid port === */
function normalizePort(port){
    const numberPort = parseInt(port, 10);

    if (isNaN(numberPort)) {
      return port;
    }

    if (numberPort >= 0) { //if a negative port is possible 
      return numberPort;
    }
    console.log("Wrong PORT value");
    return false;
}

/* === Explaination of error ===*/
function errorHandler(error){
    if (error.syscall !== 'listen'){
        throw error;
    }

    switch (error.code) {
        case 'EACCES': // admin authorization 
          console.error(bind + ' requires elevated privileges.');
          process.exit(1); // end the process which is running
          break;
        case 'EADDRINUSE': // port already use
          console.error(bind + ' is already in use.');
          process.exit(1);
          break;
        default:
          throw error;
      }
}

/*=============================================================*/
/*-------------------------- MAIN -----------------------------*/
/*=============================================================*/

const port = normalizePort(process.env.PORT || '3000') // process.env.PORT for hosting // 3000 for developpement
app.set('port', port)// to give to express app on which port is it going to run

const server = http.createServer(app);

const address = server.address();  // adress is the IP adress of the server if it's hosted and null if it's not
const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

server.on('error', errorHandler);
server.on('listening', () => {
    console.log('Listening on ' + bind);
})

server.listen(port);