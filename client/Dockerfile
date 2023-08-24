# Use a Node.js version compatible with Vite
FROM node:18

# Set working directory
WORKDIR /app

# Install yarn (if not already installed)
RUN npm install -g yarn

# Install app dependencies
COPY package*.json yarn.lock vite.config.js ./
RUN yarn install

# Copy app source
COPY . .

# Expose port and start app
EXPOSE 5173
CMD ["yarn", "run", "dev"]