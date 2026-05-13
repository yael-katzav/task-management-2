# Task Management Platform

A full-stack extensible task-management platform built with:

* ASP.NET Core Web API
* Entity Framework Core
* SQLite
* React
* TypeScript
* React Query
* React Hook Form
* Material UI

---

# Features

## General Workflow Rules

The platform supports generic workflow rules shared across all task types:

* Every task is assigned to exactly one user
* Tasks can be Open or Closed
* Closed tasks are immutable
* Statuses use ascending integers
* Forward moves must be sequential
* Backward moves are allowed
* Tasks can only be closed at their final status
* Every status change validates required task-specific data
* Every status change requires assigning the next user

---

# Supported Task Types

## Procurement Task

### Statuses

1. Created
2. Supplier offers received
3. Purchase completed

### Required Data

| Status | Required Fields |
| ------ | --------------- |
| 2      | quote1, quote2  |
| 3      | receipt         |

---

## Development Task

### Statuses

1. Created
2. Specification completed
3. Development completed
4. Distribution completed

### Required Data

| Status | Required Fields |
| ------ | --------------- |
| 2      | specification   |
| 3      | branchName      |
| 4      | version         |

---

# Project Structure

## Backend

* ASP.NET Core REST API
* Entity Framework Core
* SQLite
* Task-type handlers for extensibility

## Frontend

* React + TypeScript
* React Query for server state
* React Hook Form for form management
* Material UI components

---

# Database Design

The application uses SQLite with Entity Framework Core.

SQLite was chosen to keep the project lightweight and easy to run locally without requiring installation or configuration of a separate database server.

The system is built around a generic `Task` entity that stores shared workflow data:

* assigned user
* current status
* open/closed state
* task type
* timestamps

Task-specific data is separated into dedicated tables:

* `DevelopmentTask`
* `ProcurementTask`

Each task-specific table has a one-to-one relationship with the main `Task` entity.

This structure keeps the workflow engine generic while allowing task-specific fields and validations to evolve independently.

---

# Extensibility Approach

The system separates:

* Generic workflow rules
* Task-specific behavior

Task-specific logic is implemented through task handlers on the backend and configuration records on the frontend.

Adding a new task type requires:

## Backend

1. Create a new task entity/details model
2. Implement `ITaskTypeHandler`
3. Register the handler

No changes are required to the generic workflow engine.

## Frontend

1. Add the new task type to configuration records:

   * statuses
   * labels
   * required fields
   * final status

No structural UI changes are required.

---

# Running the Project

## Backend

### Requirements

* .NET 8

### Setup

```bash
cd server
```

Update the connection string in:

```txt
appsettings.json
```

Run migrations:

```bash
dotnet ef database update
```

Run the server:

```bash
dotnet run
```

The API will run on:

```txt
http://localhost:5252
```

---

## Frontend

### Requirements

* Node.js

### Setup

```bash
cd client
npm install
npm run dev
```

The client will run on:

```txt
http://localhost:5173
```

---

# Seeded Demo Users

The database includes seeded demo users for testing purposes.

These users can be used for:

* task assignment
* task filtering
* task reassignment

---

# Main API Endpoints

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | /api/tasks                 | Get all tasks                |
| GET    | /api/tasks/user/{userId}   | Get tasks assigned to a user |
| POST   | /api/tasks                 | Create task                  |
| PUT    | /api/tasks/{taskId}/status | Change task status           |
| PUT    | /api/tasks/{taskId}/close  | Close task                   |

---

# Notes

This project focuses primarily on:

* clean architecture
* extensibility
* separation of concerns
* reusable UI structure
* workflow validation
