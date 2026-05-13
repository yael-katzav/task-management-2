import { Router } from "express"
import userService from "./user.service"

const userRoutes = Router()

userRoutes.get("/", async (_req, res) => {
  const users = await userService.getAll()

  res.json(users)
})

export default userRoutes
