import { TaskEntity } from "./task.entity"

export type TaskHandler = {
  finalStatus: number
  createDetailsEntity: (task: TaskEntity) => void
  validateStatusData: (status: number, data: Record<string, string>) => void
  applyData: (task: TaskEntity, data: Record<string, string>) => void
  saveDetails: (task: TaskEntity) => Promise<void>
}
