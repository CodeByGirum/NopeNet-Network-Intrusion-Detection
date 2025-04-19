#!/bin/bash
echo "Starting NopeNet..."
cd "$(dirname "$0")"
docker-compose up -d
echo "NopeNet is running!"
echo "Open your browser and go to: http://localhost:3000" 