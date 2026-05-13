import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CreateTaskRequest } from "../types/task/tasks.type"
import { closeTask, createTask, getTasks, getTasksByUserId } from "./tasks.api"

export type TasksView = "all" | number

export const useTasks = (view: TasksView, includeClosed: boolean) => {
  return useQuery({
    queryKey: ["tasks", view, includeClosed],
    queryFn: () =>
      view === "all"
        ? getTasks(includeClosed)
        : getTasksByUserId(view, includeClosed),
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
