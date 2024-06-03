# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY e2e/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the e2e directory into the container
COPY e2e/ ./

# Run the command to start the e2e tests
CMD ["npm", "run", "e2e"]