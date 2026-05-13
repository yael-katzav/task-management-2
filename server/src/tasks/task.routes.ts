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

taskRoutes.get("/", async (req, res) => {
  const includeClosed = req.query.includeClosed === "true"

  const tasks = await taskService.getAll(includeClosed)

  res.json(tasks)
})

taskRoutes.get("/user/:userId", async (req, res) => {
  const includeClosed = req.query.includeClosed === "true"

  const tasks = await taskService.getByUserId(
    Number(req.params.userId),
    includeClosed
  )

  res.json(tasks)
})

export default taskRoutes
