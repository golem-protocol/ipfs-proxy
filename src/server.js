const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const lib = require('./lib');

const app = express();
const port = process.env.PORT || 9000;
const nodeIP = process.env.NODE_IP || '127.0.0.1';
const nodePort = process.env.NODE_PORT || '5001';

const ipfsClient = new lib.IpfsClient('http://' + nodeIP + ':' + nodePort);

app.use(cors());
app.use(fileUpload(null));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload/image', async function (req, res) {
    try {
        const file = await ipfsClient.add(req.files.image.data);
        lib.logger(req, { status: 200, cid: file.cid });
        res.status(200);
        res.end(JSON.stringify({ error: null, hash: file.cid.toString() }));
    } catch (e) {
        lib.logger(req, { status: 500, message: e.toString() });
        res.status(500);
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
});

app.post('/upload/text', async function (req, res) {
    try {
        const file = await ipfsClient.add(JSON.stringify(req.body));
        lib.logger(req, { status: 200, cid: file.cid });
        res.end(JSON.stringify({ error: null, hash: file.cid.toString() }));
    } catch (e) {
        lib.logger(req, { status: 500, message: e.toString() });
        res.status(500);
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
});

app.use(function (req, res) {
   res.status(404);
   res.end(JSON.stringify({'error': 'not found'}));
});

app.listen(port, function () {
    console.log(`Connecting to IPFS node at http://${nodeIP}:${nodePort}`);
    console.log(`Start IPFS proxy service at ::${port}`)
})

