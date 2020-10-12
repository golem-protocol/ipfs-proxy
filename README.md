## IPFS Proxy Service

[![License MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](/LICENSE)
[![Node](https://img.shields.io/badge/14.0.0-Node-009933?style=flat-square)](https://nodejs.org/en/)
[![IPFS Node](https://img.shields.io/badge/go_ipfs-IPFS-009999?style=flat-square)](https://hub.docker.com/r/ipfs/go-ipfs/)

This service forwards requests (upload images or text) from the client to the IPFS Node.

### Requirements
- Deploy IPFS Node use [Docker image](https://hub.docker.com/r/ipfs/go-ipfs/).

### Deployment
- Run with docker-compose
```bash
docker-compose -f docker-compose.yml up -d --build
```

**Default IPFS proxy server port is 9000**

### API Endpoints
| Description   | Url           | Method | Payload               |
| --------------|---------------|--------|-----------------------|
| Upload image  | /upload/image | POST   | form-data.files.image |
| Upload text   | /upload/text  | POST   | raw data              |

### Example and usage
- Example client upload image. [Example](example.html).
- Example upload text data:

```bash
curl -X POST -H 'Content-type: application/json' -d '{"name":"golemp"}' 127.0.0.1:9000/upload/text
```
