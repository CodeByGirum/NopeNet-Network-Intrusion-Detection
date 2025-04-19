FROM node:20-slim AS base

# Install Python and other dependencies
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3.10-venv \
    python3.10-dev \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Ensure pip is up to date
RUN python3 -m pip install --no-cache-dir --upgrade pip==24.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci

# Copy Python requirements.txt
COPY server/requirements.txt ./server/

# Install Python dependencies
RUN python3 -m pip install --no-cache-dir -r server/requirements.txt

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose ports
EXPOSE 3000 8000

# Create a startup script with error handling
RUN echo '#!/bin/bash\nset -e\necho "Starting NopeNet application..."\necho "Starting frontend service..."\nnpm run start:client & FRONTEND_PID=$!\necho "Starting backend service..."\npython3 server/app.py & BACKEND_PID=$!\nwait $FRONTEND_PID $BACKEND_PID' > /app/start.sh && \
    chmod +x /app/start.sh

# Start the application
CMD ["/app/start.sh"] 