/* eslint-disable prefer-destructuring */
export const PORT = Number(process.env.PORT);

export const NODE_ENV = process.env.NODE_ENV;

export const APP_NAME = process.env.APP_NAME || '';

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_LOGGING = process.env.DB_LOGGING === 'true';
export const DB_SYNC =
  process.env.NODE_APP_INSTANCE === '0' && process.env.DB_SYNC === 'true';

export const GMAIL_HOST = process.env.GMAIL_HOST;
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_PASS = process.env.GMAIL_PASS;

export const HEALTH_CHECK_URL = process.env.HEALTH_CHECK_URL || '';

export const JWT_EXP_TIME =
  Number(process.env.JWT_EXP_TIME) || process.env.JWT_EXP_TIME;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
