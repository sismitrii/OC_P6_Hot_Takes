const http = require('http'); // how include https ?
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT || 3000); // process.env.PORT = port par defaut proposé par la plateforme de developpement