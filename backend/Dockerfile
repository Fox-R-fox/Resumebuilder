# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy frontend files
COPY ../frontend/public /app/public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]