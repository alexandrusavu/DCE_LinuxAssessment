// Middleware setup
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { config, isDev } from '../config/index.js';

export const setupMiddleware = (app) => {
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: false // Allow inline scripts for now
  }));

  // CORS
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true
  }));

  // Request logging
  if (isDev) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use('/api/', limiter);
};
