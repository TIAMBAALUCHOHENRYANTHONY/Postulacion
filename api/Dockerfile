# Dockerfile
FROM node:18-alpine
# Create app directory
WORKDIR /usr/app/
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]
