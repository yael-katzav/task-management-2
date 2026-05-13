import "reflect-metadata"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { AppDataSource } from "./data-source"
import taskRoutes from "./tasks/task.routes"
import userRoutes from "./users/user.routes"

dotenv.config()

const PORT = 5252

async function bootstrap() {
  await AppDataSource.initialize()

  const app = express()

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  )

  app.use(express.json())

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
    })
  })

  app.use("/api/tasks", taskRoutes)
  app.use("/api/users", userRoutes)

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error)
})
