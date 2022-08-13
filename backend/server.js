const http = require("http");
const server = http.createServer((req, res) => {
    res.end("voilà la réponse du server !");
});
server.listen(process.env.PORT);