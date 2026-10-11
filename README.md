# CodeFlow

CodeFlow is an AI-powered project planning platform that converts a raw software idea into a structured implementation plan. It generates an interactive workflow graph, recommends a tech stack, produces scaffold commands, and lets authenticated users save generated plans for later review.

This project is built as a full-stack application with a React/Vite frontend, an Express/MongoDB backend, JWT authentication, and Gemini-powered plan generation.

## Why This Project Exists

Starting a software project often involves scattered planning: requirements in one place, architecture in another, tech choices in a chat thread, and setup commands written manually. CodeFlow brings those early planning steps into one workflow:

- describe the project idea
- choose the output modules you want
- generate a structured development roadmap
- inspect the roadmap as an interactive graph
- save useful plans to your account

## Core Features

- AI workflow generation from a project prompt
- Interactive phase-based flowchart using React Flow
- Single-phase filtering for focused workflow inspection
- Tech stack recommendations with reasoning and alternatives
- Bash command generation for project scaffolding
- JWT-based signup, login, and session validation
- Save, view, and delete generated workflows
- Exportable workflow visuals
- User-friendly AI/provider error messages
- Responsive dark UI built for planning and repeated use

## Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- React Router
- React Flow / XYFlow
- Dagre graph layout
- Lucide React and Tabler Icons
- React Hot Toast
- html-to-image

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Google Generative AI SDK
- dotenv and CORS

### AI Provider

- Gemini is used for the active workflow generation path.
- A Qwen/Ollama provider file also exists for local model experimentation.

## Architecture Overview

```txt
User Prompt
   |
   v
React Prompt Page
   |
   v
POST /api/generate/workflow
   |
   v
Express Controller
   |
   v
Prompt Builder -> Gemini Provider -> JSON Parser
   |
   v
Workflow Parser
   |
   v
Nodes, Edges, Tech Stack, Bash Commands
   |
   v
React Result Page / Interactive Flowchart
```

Saved workflows are handled separately from generation. The app does not feed previous generations back into the LLM.

## Project Structure

```txt
Codeflow/
  backend/
    app.js
    config/
      db.js
      gemini.js
      qwen3.js
    controllers/
      authController.js
      workflowController.js
    middleware/
      auth.js
    models/
      User.js
      SavedWorkflow.js
    routes/
      auth.js
      workflow.js
    utils/
      generateWorkflowJson.js
      jsonParser.js
      parseWorkflowJson.js
      prompt.js

  frontend/
    components/
      auth/
      workflow/
      ui/
    context/
      AuthContext.jsx
    pages/
      Login.jsx
      Signup.jsx
      Prompt.jsx
      Result.jsx
      SavedWorkflows.jsx
    src/
      App.jsx
      main.jsx
```

## API Overview

### Auth

| Method | Endpoint           | Description                            |
| ------ | ------------------ | -------------------------------------- |
| POST   | `/api/auth/signup` | Create a user account                  |
| POST   | `/api/auth/login`  | Authenticate and return a JWT          |
| GET    | `/api/auth/me`     | Validate token and return current user |

### Workflows

| Method | Endpoint                  | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| POST   | `/api/generate/workflow`  | Legacy generation route used by the frontend |
| POST   | `/api/workflows/generate` | Generate a workflow plan                     |
| POST   | `/api/workflows/save`     | Save a generated workflow                    |
| GET    | `/api/workflows`          | Fetch saved workflows for the logged-in user |
| GET    | `/api/workflows/:id`      | Fetch one saved workflow                     |
| DELETE | `/api/workflows/:id`      | Delete a saved workflow                      |

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
MONGO_DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
OLLAMA_URL=http://localhost:11434
```

Create a `.env` file inside `frontend/` if your backend is not running at `http://localhost:3000`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Do not commit real API keys, database URLs, or JWT secrets.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/YuviX-514/codeFlow.git
cd codeFlow
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start the backend

```bash
cd ../backend
npm run server
```

The backend runs on `http://localhost:3000` by default.

### 5. Start the frontend

```bash
cd ../frontend
npm run dev
```

The frontend usually runs on `http://localhost:5173`.

## Build

```bash
cd frontend
npm run build
```

## Important Implementation Details

- The LLM is instructed to return strict JSON only.
- `jsonParser.js` cleans and parses model output.
- `parseWorkflowJson.js` transforms AI JSON into React Flow nodes and edges.
- The workflow graph supports full-layout viewing and phase-specific viewing.
- In phase-specific view, the root workflow node is intentionally hidden so users can focus on the selected phase.
- Saved workflows are scoped by authenticated user ID.
- Backend generation errors are classified into clearer frontend messages, such as provider unavailable, rate limited, timeout, or invalid output.

## Future Improvements

- Add automated backend and frontend tests.
- Add streaming generation progress.
- Add workflow editing and version history.
- Add export to PDF/Markdown.
- Add provider selection between Gemini and local Ollama models.
- Add richer schema validation for LLM responses.
- Add team collaboration and shared workspaces.

## Status

CodeFlow is an MVP/full-stack portfolio project focused on AI-assisted software planning. The current version supports generation, visualization, authentication, and saved workflow management.
