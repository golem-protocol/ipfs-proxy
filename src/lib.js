const IpfsHttpClient = require('ipfs-http-client');

class IpfsClient {
    constructor(rawUrl) {
        this.rawUrl = rawUrl;
        this.client = new IpfsHttpClient(this.rawUrl);
    }

    async add(data) {
        const cid = await this.client.add(data);
        return cid;
    }
}

const logger = function (req, res) {
    let logObject = {
        'method': req.method.padEnd(6),
        'status': res.status.toString().padEnd(3),
        'url': req.url,
    }
    if (req.headers['X-Forward-IP']) logObject['ip'] = req.headers['X-Forward-IP'];
    else if (req.headers['x-forward-ip']) logObject['ip'] = req.headers['x-forward-ip'];
    else logObject['ip'] = req.ip;

    if (res.status === 200) {
        logObject['cid'] = res.cid;
    } else {
        logObject['message'] = res.message;
    }

    let level = res.status === 200 ? 'info'.padEnd(5) : 'ERROR'.padEnd(4);
    let logString = new Date().toISOString().padEnd(12) + ' ' + level + ' ';
    for (let key in logObject) {
        logString += key + '=' + logObject[key] + ' ';
    }
    console.log(logString);
}

module.exports = {
    IpfsClient: IpfsClient,
    logger: logger
};
