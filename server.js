console.log("heyyyyy");

//creating server using HTTP

const http = require('http');

const hostname='127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
    //checkpoint1
    res.statusCode=200;
    //c2
    res.setHeader('Content-Type','text/plain');
    //data
    res.end("Hello World");
})

server.listen(port,hostname,()=>{
    console.log(Server is running at http://${hostname}:${port});
})
