const express      = require('express');
const helmet       = require('helmet');
const cors         = require('cors');
const compression  = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss          = require('xss-clean');
const hpp          = require('hpp');
const cookieParser = require('cookie-parser');

const { cors: corsConfig, isProd } = require('./config/env');
const requestId    = require('./middleware/requestId.middleware');
const httpLogger   = require('./middleware/httpLogger.middleware');
const { apiLimiter } = require('./middleware/rateLimit.middleware');
const notFound     = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const v1Router = require('./routes/v1/index');

const app = express();

// ─────────────────────────────────────────────────────────────────────────────
// 1. Request tracing — must be FIRST so requestId is available everywhere
// ─────────────────────────────────────────────────────────────────────────────
app.use(requestId);

// ─────────────────────────────────────────────────────────────────────────────
// 2. Security headers (OWASP)
// ─────────────────────────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: isProd,   // only enforce CSP in production
}));

// ─────────────────────────────────────────────────────────────────────────────
// 3. CORS — whitelist from env, allow credentials for cookie-based refresh
// ─────────────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, cb) => {
    // allow server-to-server (no origin) or whitelisted origins
    if (!origin || corsConfig.allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.options('*', cors()); // pre-flight for all routes

// ─────────────────────────────────────────────────────────────────────────────
// 4. HTTP request logger
// ─────────────────────────────────────────────────────────────────────────────
app.use(httpLogger);

// ─────────────────────────────────────────────────────────────────────────────
// 5. Body parsing & compression
// ─────────────────────────────────────────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// ─────────────────────────────────────────────────────────────────────────────
// 6. Input sanitization — prevent NoSQL injection + XSS
// ─────────────────────────────────────────────────────────────────────────────
app.use(mongoSanitize());   // strip $ and . from req.body / req.params / req.query
app.use(xss());             // sanitize user input from HTML entities
app.use(hpp());             // prevent HTTP Parameter Pollution

// ─────────────────────────────────────────────────────────────────────────────
// 7. Global rate limiter (per-route limiters applied inside routes)
// ─────────────────────────────────────────────────────────────────────────────
app.use('/api', apiLimiter);

// ─────────────────────────────────────────────────────────────────────────────
// 8. Health check — no auth, no rate limit, monitored by ALB / K8s probe
// ─────────────────────────────────────────────────────────────────────────────
app.get('/health', (req, res) =>
  res.json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    uptime:    process.uptime(),
    requestId: res.locals.requestId,
  })
);

// ─────────────────────────────────────────────────────────────────────────────
// 9. Versioned API routes
// ─────────────────────────────────────────────────────────────────────────────
app.use('/api/v1', v1Router);

// Convenience redirect: /api → /api/v1 (makes adoption easier)
app.use('/api', (req, res) => res.redirect(301, `/api/v1${req.url}`));

// ─────────────────────────────────────────────────────────────────────────────
// 10. 404 + Global error handler — must be LAST
// ─────────────────────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorMiddleware);

module.exports = app;
