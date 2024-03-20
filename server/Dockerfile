FROM node:20-alpine

# creates /work and changes into it
WORKDIR /work

# copy package.json and package-lock.json into image
COPY package*.json .

# install dependencies without dev-dependencies
RUN npm ci --only=production

# copy all files into current working directory (except .dockerignore)
COPY . .

# turns on node.js optimizations
ENV NODE_ENV production

# security consideration - do not nun service as root
USER node

# meta information - service will run on port 8080
EXPOSE 8080

# stopsignal to terminate
STOPSIGNAL SIGINT

ENTRYPOINT [ "node", "server.js" ]
