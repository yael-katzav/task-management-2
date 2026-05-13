import type { TaskType } from "../../types/task/tasks.type"
import { taskStatusesByType, taskTypeOptions } from "./task.config"

export const getTaskTypeLabel = (type: TaskType) =>
  taskTypeOptions.find((option) => option.value === type)?.label ?? type

export const getTaskStatusLabel = (type: TaskType, status: number) =>
  taskStatusesByType[type]?.find((option) => option.value === status)?.label ??
  `Status ${status}`
