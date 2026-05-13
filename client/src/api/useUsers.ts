import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { User } from "../types/task/tasks.type"
import { API_URL } from "./api.const"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>(`${API_URL}/api/users`)
      return response.data
    },
  })
}
