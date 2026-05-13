import { TaskType } from "@shared/task/task-type.enum"
import procurementHandler from "src/procurement-tasks/procurement-task.util"
import developmentHandler from "../development-tasks/development.util"

export const TASK_HANDLERS = {
  [TaskType.Development]: developmentHandler,
  [TaskType.Procurement]: procurementHandler,
}
