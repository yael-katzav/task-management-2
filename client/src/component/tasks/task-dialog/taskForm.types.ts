import type { TaskType } from "../../../types/task/tasks.type"

export type TaskFormValues = {
  type: TaskType | ""
  assignedUserId: number | ""
  status: number | ""
  details: Record<string, string>
}
