import { TaskType } from "@shared/task/task-type.enum"

export type TaskFormValues = {
  type: TaskType | ""
  assignedUserId: number | ""
  status: number | ""
  details: Record<string, string>
}
