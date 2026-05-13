# Task Management Platform

An extensible full-stack task management platform built with:

- Node.js
- Express
- TypeScript
- TypeORM
- SQLite
- React
- React Query
- React Hook Form
- Material UI

---

# Overview

This project implements a generic task workflow engine that separates:

- General workflow rules shared across all task types
- Task-specific business logic

The architecture supports adding new task types without changing the core workflow logic.

---

# Core Workflow Rules

The following rules apply to all task types:

1. A task is assigned to exactly one user at any moment
2. A task is either Open or Closed
3. Closed tasks are immutable
4. Statuses use ascending integers (`1 → 2 → 3`)
5. Forward transitions must be sequential
6. Backward transitions are allowed
7. A task may only be closed at its final status
8. Every status change:
   - validates task-specific required fields
   - records the next assigned user

---

# Supported Task Types

## Procurement Task

### Statuses

| Status | Meaning |
|---|---|
| 1 | Created |
| 2 | Supplier offers received |
| 3 | Purchase completed |

### Required Fields

| Status | Required Fields |
|---|---|
| 2 | quote1, quote2 |
| 3 | receipt |

---

## Development Task

### Statuses

| Status | Meaning |
|---|---|
| 1 | Created |
| 2 | Specification completed |
| 3 | Development completed |
| 4 | Distribution completed |

### Required Fields

| Status | Required Fields |
|---|---|
| 2 | specification |
| 3 | branchName |
| 4 | version |

---

# Backend Architecture

The backend is built using:

- Express
- TypeScript
- TypeORM
- SQLite

## Design Approach

The project separates:

- Generic workflow logic
- Task-specific behavior

Shared workflow rules are handled in the main task service.

Task-specific logic is implemented through dedicated task handlers.

Each task handler is responsible for:

- validating required fields
- applying task-specific data
- creating task-specific entities
- defining the final status

This allows new task types to be added without modifying the existing workflow engine.

---

# Frontend Architecture

The frontend is built using:

- React
- TypeScript
- React Query
- React Hook Form
- Material UI

## Features

- Create task
- Change task status
- Move task backward and forward
- Close task
- View all tasks
- View tasks assigned to a specific user
- Dynamic task forms based on task type
- Validation rules synchronized with backend workflow rules

---

# Database

The project uses SQLite with TypeORM migrations.

The database schema includes:

- users
- tasks
- development_tasks
- procurement_tasks

Task-specific data is stored in dedicated tables linked to the generic `tasks` table through one-to-one relations.

---

# Demo Users

Seeded demo users are included through migrations.

These users can be used for:

- task assignment
- reassignment
- filtering tasks

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/user/:userId` | Get tasks assigned to user |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:taskId/status` | Change task status |
| PUT | `/api/tasks/:taskId/close` | Close task |
| GET | `/api/users` | Get users |

---

# Running the Project

## Backend

### Requirements

- Node.js 20+
- npm

### Setup

```bash
cd server
npm install
```

### Run migrations

```bash
npm run migration:run
```

### Start server

```bash
npm run dev
```

The backend runs on:

```txt
http://localhost:5252
```

---

## Frontend

### Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on:

```txt
http://localhost:5173
```

---

# Extending the System

To add a new task type:

## Backend

1. Create a new task details entity
2. Create a new task handler
3. Register the handler in `TASK_HANDLERS`

No modifications are required in the generic workflow logic.

## Frontend

1. Add task configuration:
   - statuses
   - labels
   - required fields
   - final status

No structural UI changes are required.

---

# Notes

This project focuses on:

- extensible architecture
- reusable workflow logic
- clean separation of concerns
- generic task handling
- scalable frontend structure
