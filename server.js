const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/'){
    const indexHTML = fs.readFileSync('./index.html');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(indexHTML)
  }

  if(req.method === 'GET' && req.url.startsWith('/static')){
    const filePath = req.url.split('/static')[1];
    let fileType = filePath.split('.')[1];
    if(fileType === 'jpg') {
      res.setHeader('Content-Type', `image/jpeg`);
    }
    if(fileType === 'css'){
      res.setHeader('Content-Type', `text/css`);
    }else{
      res.statusCode = 404;
      return res.end('asset not found')
    }
    const file = fs.readFileSync(`./assets${filePath}`);
    console.log(fileType)
    return res.end(file);
  }
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));