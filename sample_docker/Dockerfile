# Setting a image base
FROM node:20.9.0-alpine

# Setting the working directory
WORKDIR /app

# Copy package json file
COPY package*.json ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the project
RUN pnpm build

# Expose the port where the application will run
EXPOSE 3000

# Command to run production
CMD [ "pnpm", "start:prod" ]