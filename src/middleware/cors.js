import cors from 'cors';

const allowedOrigins = [
  'https://petsqr.netlify.app',
  'https://serverpetsqr.onrender.com',
  'http://localhost:5173',
  'http://localhost:5000',
  'http://localhost',
  'http://127.0.0.1:5500'
];

const corsConfig = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

module.exports = corsConfig;
