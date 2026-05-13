import { TaskType } from "@shared/task/task-type.enum"
import { TaskEntity } from "./task.entity"

const getTaskDetails = (task: TaskEntity) => {
  const detailsByType = {
    [TaskType.Development]: task.developmentTask,
    [TaskType.Procurement]: task.procurementTask,
  }

  return detailsByType[task.type] ?? null
}

export const mapTaskResponse = (task: TaskEntity) => ({
  id: task.id,
  type: task.type,
  status: task.status,
  isClosed: task.isClosed,
  assignedUserId: task.assignedUserId,
  assignedUser: task.assignedUser,
  createdAt: task.createdAt,
  details: getTaskDetails(task),
})
