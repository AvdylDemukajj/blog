const http = require("http");
const app = require("./app");
const { port } = require("./config/keys");

//create app server
const server = http.createServer(app);

//liten server
server.listen(port, () => console.log(`Server is running on port ${port}`));
