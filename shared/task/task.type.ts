import { TaskType } from "./task-type.enum"

export type TaskResponse = {
  id: string
  type: TaskType
  status: number
  isClosed: boolean
  assignedUserId: number
  createdAt: string
}

export type CreateTaskDto = {
  type: TaskType
  assignedUserId: number
}

export type ChangeTaskStatusDto = {
  newStatus: number
  assignedUserId: number
  data: Record<string, string>
}
