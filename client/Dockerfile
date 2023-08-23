# Dockerfile
# Pulling base image
FROM node:16-alpine
# Set working directory
WORKDIR /app
# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn install
# Copy app source
COPY . .
COPY vite.config.js ./
# Expose port and start app
EXPOSE 5173
CMD ["yarn", "run", "dev"]
