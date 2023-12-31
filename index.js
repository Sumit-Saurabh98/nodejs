const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require('./modules/replaceTemplate')

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

const tempOverview = fs.readFileSync(
  `${__dirname}/template/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/template/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/data/product.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {

  const {query, pathname} = url.parse(req.url, true)
  // overview template
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

    res.end(output);
  }

  // product template
  else if (pathname === "/product") {
     res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const product = dataObject[query.id]

    const output = replaceTemplate(tempProduct, product)
   
    res.end(output);
  }
  //
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world!",
    });

    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, () => {
  console.log("server listening");
});
