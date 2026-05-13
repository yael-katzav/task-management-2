import type {
  ChangeTaskStatusRequest,
  CreateTaskRequest,
  TaskResponse,
} from "../types/task/tasks.type"
import { API_URL } from "./api.const"

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message || "Request failed")
  }

  return response.json()
}

export const getTasks = async (includeClosed: boolean) => {
  const response = await fetch(
    `${API_URL}/api/tasks?includeClosed=${includeClosed}`
  )

  return handleResponse<TaskResponse[]>(response)
}

export const getTasksByUserId = async (
  userId: number,
  includeClosed: boolean
) => {
  const response = await fetch(
    `${API_URL}/api/tasks/user/${userId}?includeClosed=${includeClosed}`
  )

  return handleResponse<TaskResponse[]>(response)
}

export const createTask = async (request: CreateTaskRequest) => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  return handleResponse<TaskResponse>(response)
}

export const changeTaskStatus = async (
  taskId: string,
  request: ChangeTaskStatusRequest
) => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  return handleResponse<TaskResponse>(response)
}

export const closeTask = async (taskId: string) => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}/close`, {
    method: "PUT",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message || "Request failed")
  }
}
