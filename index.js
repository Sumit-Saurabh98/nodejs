const fs = require('fs');
const http = require("http");
const url = require('url');

// file system
// blocking synchronous =way

// const text = fs.readFileSync("./testing.txt", "utf8");

// const newText = `${text} \nThis is new text`

// fs.writeFileSync("./writing.txt", text)

// non-blocking way

// fs.readFile("./data/data1.txt", "utf-8", (err, data1) => {
//     fs.readFile(`./data/${data1}/txt`, "utf8", (err, data2)=>{
//         fs.readFile(`./data/${data2}/txt`, "utf8", (err, data3)=>{
//             console.log(data1, data2, data3);
//         })
//     })
// })

// fs.writeFile('./data/data4.txt', "I am from another planet.", "utf-8", error => {
//     console.log("data written")
// })

// server

const server  = http.createServer((req, res) => {

    if(req.url === "/" || req.url === "/overview"){
        res.end("This is the OVERVIEW");
    }else if(req.url === "/products"){
        res.end("This is the product page")
    }else{
        res.writeHead(404, {
            "Content-type" : "text/html",
            "my-own-header" : "Hello world!"
        })

        res.end("<h1>Page not found</h1>")
    }
    
})

server.listen(8000, () => {
    console.log("server listening")
})