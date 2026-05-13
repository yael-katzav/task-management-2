import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ChangeTaskStatusRequest } from "../types/task/tasks.type"
import { changeTaskStatus } from "./tasks.api"

type ChangeTaskStatusParams = {
  taskId: string
  data: ChangeTaskStatusRequest
}

export function useChangeTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, data }: ChangeTaskStatusParams) =>
      changeTaskStatus(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}
