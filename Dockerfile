# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy test files
COPY . .

# Set environment variable for SSL
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Default command to run tests
CMD ["npm", "test"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD npm run test:youtube || exit 1
