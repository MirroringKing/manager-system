/* eslint-disable prettier/prettier */
const http = require("http");

const server = http.createServer((req, res) => {
    res.end("hello wrold vue3");
    // eslint-disable-next-line prettier/prettier
});

// eslint-disable-next-line prettier/prettier
server.listen(4000);