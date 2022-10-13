const http = require("http");
const fs = require('fs');

// const host = 'localhost';
// const port = 8000;

// const requestListener = function (req, res) {
//     fs.readFile(__dirname + "/leafmap.html")
//         .then(contents => {
//             res.setHeader("Content-Type", "text/html");
//             res.writeHead(200);
//             res.end(contents);
//         })
//         .catch(err => {
//             res.writeHead(500);
//             res.end(err);
//             return;
//         });
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });


var server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'application/javascript'})
    const html = fs.readFileSync('./leafmap.html')
    res.end(html)
}).listen(8000, () => {
    console.log('server start on port 8000')
});
