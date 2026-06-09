# IntellMeet

IntellMeet is an AI-powered meeting collaboration platform that combines HD video conferencing (via WebRTC), real-time team chat, AI meeting intelligence (live transcription, smart summarization, action item extraction), and project task boards.

## Project Structure

```
IntellMeet/
│
├── 📁 frontend/                         # React Frontend (Vite + TS)
│   ├── 📁 public/                       # Static assets & index.html
│   └── 📁 src/                          # TypeScript source files (Components, Hooks, Pages, Services, Stores)
│
├── 📁 backend/                          # Node.js + Express Backend
│   └── 📁 src/                          # Sockets, Models, Controllers, Services, AI Engines, Routes
│
├── 📁 devops/                           # DevOps / Deployment Configs (Docker Compose, Nginx, Kubernetes, Helm)
│
├── 📁 docs/                             # System Architecture & API docs
│
└── 📁 scripts/                          # DB Seeding, load-testing, and deployment scripts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Redis](https://redis.io/) (for pub/sub and caching)

### Running Locally

1. **Backend Server**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend client**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
