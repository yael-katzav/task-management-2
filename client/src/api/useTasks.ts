import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { CreateTaskRequest, TaskResponse } from "../types/task/tasks.type"
import { API_URL } from "./api.const"
import { closeTask, createTask } from "./tasks.api"

export type TasksView = "all" | number

export function useTasks(view: TasksView) {
  return useQuery({
    queryKey: ["tasks", view],
    queryFn: async () => {
      const url =
        view === "all"
          ? `${API_URL}/api/tasks`
          : `${API_URL}/api/tasks/user/${view}`

      const response = await axios.get<TaskResponse[]>(url)
      return response.data
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateTaskRequest) => createTask(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export const useCloseTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId: string) => closeTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}
