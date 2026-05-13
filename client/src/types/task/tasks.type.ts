export type TaskType = "Procurement" | "Development"

export type User = {
  id: number
  name: string
}

export type TaskResponse = {
  id: string
  type: TaskType
  status: number
  isClosed: boolean
  assignedUserId: number
  createdAt: string
  details?: Record<string, string | null>
  assignedUser?: User
}

export type CreateTaskRequest = {
  type: TaskType
  assignedUserId: number
}

export type ChangeTaskStatusRequest = {
  newStatus: number
  assignedUserId: number
  data?: Record<string, string>
}
