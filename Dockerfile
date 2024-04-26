# Stage 1: Build React frontend
FROM node:latest as frontend-builder

WORKDIR /Cheeseria_PZ/client

# Copy package.json and package-lock.json
COPY cheese/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY client/cheese/ ./

# Build frontend
RUN npm run build

# Stage 2: Build Node.js backend
FROM node:latest as backend-builder

WORKDIR /Cheeseria_PZ/server

# Copy package.json and package-lock.json
COPY /package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY server/ ./

# Stage 3: Final Image
FROM node:latest

WORKDIR /Cheeseria_PZ

# Copy built frontend files from the frontend-builder stage
COPY --from=frontend-builder /Cheeseria_PZ/client/cheese/build ./client/cheese/build

# Copy built backend files from the backend-builder stage
COPY --from=backend-builder /Cheeseria_PZ/server ./

# Expose port
EXPOSE 3000
EXPOSE 5050

# Command to run the application
CMD ["npm", "start"]
