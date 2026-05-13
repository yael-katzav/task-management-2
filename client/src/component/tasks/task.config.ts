import { TaskType } from "@shared/task/task-type.enum"

export const CURRENT_USER_ID = 1

export type TaskFieldConfig = {
  name: string
  label: string
  requiredFromStatus: number
}

export const taskTypeOptions: { value: TaskType; label: string }[] = [
  { value: TaskType.Development, label: "Development Task" },
  { value: TaskType.Procurement, label: "Procurement Task" },
]

export const taskFieldsByType: Record<TaskType, TaskFieldConfig[]> = {
  Development: [
    { name: "specification", label: "Specification", requiredFromStatus: 2 },
    { name: "branchName", label: "Branch Name", requiredFromStatus: 3 },
    { name: "version", label: "Version", requiredFromStatus: 4 },
  ],

  Procurement: [
    { name: "quote1", label: "Quote 1", requiredFromStatus: 2 },
    { name: "quote2", label: "Quote 2", requiredFromStatus: 2 },
    { name: "receipt", label: "Receipt", requiredFromStatus: 3 },
  ],
}

export const taskStatusesByType: Record<
  TaskType,
  { value: number; label: string }[]
> = {
  Development: [
    { value: 1, label: "Created" },
    { value: 2, label: "Specification completed" },
    { value: 3, label: "Development completed" },
    { value: 4, label: "Distribution completed" },
  ],

  Procurement: [
    { value: 1, label: "Created" },
    { value: 2, label: "Supplier offers received" },
    { value: 3, label: "Purchase completed" },
  ],
}

export const finalStatusByTaskType: Record<TaskType, number> = {
  Development: 4,
  Procurement: 3,
}

export const TASKS_COLUMS = ["Task", "Status", "Assigned", "State", "Created"]
