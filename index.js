const fs = require("fs");
const http = require("http");
const url = require("url");

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

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%IMAGE%}/g, product.image);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not_organic');

    return output;
}
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
  // overview template
  if (req.url === "/" || req.url === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    console.log(cardsHtml)

    res.end(output);
  }

  // product template
  else if (req.url === "/products") {
    res.end("This is the product page");
  }
  //
  else if (req.url === "/api") {
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
