FROM node:12

WORKDIR /app/ipfs-proxy

COPY . .

RUN npm install

CMD ["npm", "start"]
