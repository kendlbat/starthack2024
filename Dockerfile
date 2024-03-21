# create a container to build client
FROM node:latest as client
WORKDIR /work
COPY client/package*.json ./
ENV NODE_ENV production
RUN npm i --omit=dev
COPY client/ ./
RUN npm run build

# create a container to build server
FROM node:latest as server
WORKDIR /work

# copy package.json and package-lock.json into image
COPY package*.json .

# install dependencies without dev-dependencies
RUN npm i --omit=dev

# copy all files into current working directory (except .dockerignore)
COPY . .

# copy client build into server
COPY --from=client /work/dist /work/client/dist


# turns on node.js optimizations
ENV NODE_ENV production

# security consideration - do not nun service as root
USER node

EXPOSE 3000

# stopsignal to terminate
STOPSIGNAL SIGINT

ENTRYPOINT [ "npm", "start" ]
