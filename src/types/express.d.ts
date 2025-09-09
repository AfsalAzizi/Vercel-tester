declare namespace Express {
  interface Request {
    dbStatus?: string;
    isDbConnected?: boolean;
  }
}
