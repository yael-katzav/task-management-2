import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "./api.const"

type ChangeTaskStatusParams = {
  taskId: string
  data: {
    newStatus: number
    assignedUserId: number
    data: Record<string, unknown>
  }
}

export function useChangeTaskStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, data }: ChangeTaskStatusParams) => {
      const response = await axios.put(
        `${API_URL}/api/tasks/${taskId}/status`,
        data
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}
