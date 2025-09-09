# Project Structure

## 📁 Directory Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection configuration
├── controllers/
│   └── healthController.ts  # Health check controllers
├── middleware/
│   ├── index.ts            # Common middleware (CORS, logging, error handling)
│   └── databaseMiddleware.ts # Database-specific middleware
├── routes/
│   ├── index.ts            # Main routes aggregator
│   └── healthRoutes.ts     # Health check routes
├── types/
│   └── express.d.ts        # TypeScript declarations for Express
└── index.ts                # Main application entry point
```

## 🏗️ Architecture

### **Controllers** (`src/controllers/`)

- **healthController.ts**: Contains all health check logic
  - `getHealth()`: Basic health check
  - `getDatabaseHealth()`: Database connection health check
  - `getRoot()`: Root endpoint with API information

### **Routes** (`src/routes/`)

- **index.ts**: Main routes aggregator that combines all routes
- **healthRoutes.ts**: Health check specific routes
  - `GET /api/health`
  - `GET /api/db-health`

### **Middleware** (`src/middleware/`)

- **index.ts**: Common middleware
  - `corsMiddleware`: CORS handling
  - `requestLogger`: Request logging
  - `errorHandler`: Global error handling
  - `notFoundHandler`: 404 handling
- **databaseMiddleware.ts**: Database-specific middleware
  - `ensureDatabaseConnection`: Ensures DB connection
  - `addDatabaseStatus`: Adds DB status to request

### **Config** (`src/config/`)

- **database.ts**: MongoDB connection configuration
  - `connectDatabase()`: Establishes MongoDB connection
  - `disconnectDatabase()`: Graceful disconnection
  - `getDatabaseStatus()`: Gets current connection status

### **Types** (`src/types/`)

- **express.d.ts**: TypeScript declarations for Express Request extensions

## 🔧 Key Features

### **Database Connection**

- Optimized for Vercel serverless environment
- Single connection pool (maxPoolSize: 1)
- Automatic reconnection on health check
- Detailed error logging and status reporting

### **Error Handling**

- Global error handler
- Detailed error responses in development
- Graceful error handling in production
- Request logging for debugging

### **Health Checks**

- Basic health check (`/api/health`)
- Database health check (`/api/db-health`)
- Automatic database reconnection attempt
- Detailed connection status information

## 🚀 Deployment

### **Vercel Configuration**

- Uses `vercel.json` for traditional server deployment
- Optimized for persistent MongoDB connections
- No individual serverless functions (avoids conflicts)

### **Environment Variables**

- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)

## 📊 API Endpoints

### **Root Endpoint**

- `GET /` - API information and available endpoints

### **Health Endpoints**

- `GET /api/health` - Basic health check
- `GET /api/db-health` - Database health check with reconnection

## 🔍 Benefits of This Structure

1. **Separation of Concerns**: Clear separation between controllers, routes, and middleware
2. **Maintainability**: Easy to add new features and endpoints
3. **Testability**: Controllers can be easily unit tested
4. **Scalability**: Easy to add new modules and features
5. **Error Handling**: Centralized error handling and logging
6. **Type Safety**: Full TypeScript support with proper type declarations
