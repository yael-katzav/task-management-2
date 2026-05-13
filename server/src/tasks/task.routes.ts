import { Router } from "express"
import taskService from "./task.service"

const taskRoutes = Router()

taskRoutes.post("/", async (req, res) => {
  const task = await taskService.createTask(req.body)

  res.status(201).json(task)
})

taskRoutes.put("/:taskId/status", async (req, res) => {
  const task = await taskService.changeStatus(req.params.taskId, req.body)

  res.json(task)
})

taskRoutes.put("/:taskId/close", async (req, res) => {
  await taskService.closeTask(req.params.taskId)

  res.sendStatus(204)
})

taskRoutes.get("/", async (_req, res) => {
  const tasks = await taskService.getAll()

  res.json(tasks)
})

taskRoutes.get("/user/:userId", async (req, res) => {
  const tasks = await taskService.getByUserId(Number(req.params.userId))

  res.json(tasks)
})

export default taskRoutes
