# Express TypeScript MongoDB App

A simple Express.js application built with TypeScript and MongoDB connection, featuring health check endpoints.

## Features

- ✅ Express.js with TypeScript
- ✅ MongoDB connection using Mongoose
- ✅ Health check endpoint
- ✅ Database connection verification endpoint
- ✅ Environment configuration
- ✅ CORS support
- ✅ Error handling
- ✅ Graceful shutdown

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or accessible via connection string)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp env.example .env
```

3. Update the `.env` file with your MongoDB connection string:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/quickbarber
NODE_ENV=development
```

**Note:** If you don't have MongoDB running locally, you can use MongoDB Atlas (cloud) by updating the `MONGODB_URI` with your Atlas connection string.

## Running the Application

### Development Mode

```bash
npm run dev
```

### Development Mode with Auto-reload

```bash
npm run dev:watch
```

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Health Check

- **GET** `/api/health`
- Returns server status, uptime, and environment information

### Database Health Check

- **GET** `/api/db-health`
- Verifies MongoDB connection status
- Returns detailed database connection information

### Root Endpoint

- **GET** `/`
- Returns welcome message and available endpoints

## Example Responses

### Health Check Response

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### Database Health Check Response (Success)

```json
{
  "status": "OK",
  "database": {
    "status": "connected",
    "connected": true,
    "message": "Database connection is working perfectly"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Database Health Check Response (Error)

```json
{
  "status": "ERROR",
  "database": {
    "status": "disconnected",
    "connected": false,
    "message": "Database connection is not available"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Project Structure

```
src/
├── config/
│   └── database.ts      # MongoDB connection configuration
├── routes/
│   └── health.ts        # Health check routes
└── index.ts             # Main application entry point
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

## Testing the Endpoints

### Local Development

1. Start the application
2. Open your browser or use curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Database health check
curl http://localhost:3000/api/db-health
```

## Vercel Deployment

This app is configured to work with Vercel's serverless architecture. To deploy:

1. **Install Vercel CLI** (optional):

```bash
npm i -g vercel
```

2. **Deploy to Vercel**:

```bash
vercel
```

3. **Set Environment Variables** in Vercel dashboard:

   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production

4. **Access your deployed endpoints**:
   - Health check: `https://your-app.vercel.app/api/health`
   - DB health check: `https://your-app.vercel.app/api/db-health`

### Vercel Configuration

The app includes:

- `vercel.json`: Vercel configuration for traditional server deployment
- Persistent MongoDB connection with connection pooling
- Traditional Express.js server that runs continuously

### Important Notes for Vercel

- **MongoDB Connection**: The app establishes a persistent connection with connection pooling
- **Performance**: No cold starts - database connection stays alive between requests
- **Connection Pool**: Configured for optimal MongoDB performance with 10 concurrent connections
- **Environment Variables**: Make sure to set `MONGODB_URI` in your Vercel project settings
- **Cost**: Traditional server approach may have higher costs than serverless for low-traffic apps
