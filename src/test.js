const lib = require('./lib');

const client = new lib.IpfsClient('http://127.0.0.1:5001');

async function test() {
    const cid = await client.add(JSON.stringify({
        name: 'toan'
    }));
    console.log(cid);
}

test();
