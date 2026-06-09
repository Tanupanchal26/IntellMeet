const express = require('express');
const cors = require('cors');
const rateLimitMiddleware = require('./middleware/rateLimit.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const meetingRoutes = require('./routes/meeting.routes');
const chatRoutes = require('./routes/chat.routes');
const aiRoutes = require('./routes/ai.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimitMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorMiddleware);

module.exports = app;
