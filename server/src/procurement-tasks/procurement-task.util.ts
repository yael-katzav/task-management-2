import { BadRequestError } from "src/errors/BadRequestError.error"
import { TaskHandler } from "src/tasks/task-handler.type"

const procurementHandler: TaskHandler = {
  finalStatus: 3,

  validateStatusData(status, data) {
    if (status >= 2) {
      if (!data.quote1 || !data.quote2) {
        throw new BadRequestError("Both quotes are required.")
      }
    }

    if (status >= 3 && !data.receipt) {
      throw new BadRequestError("Receipt is required.")
    }
  },

  applyData(task, data) {
    if (!task.procurementTask) return

    task.procurementTask.quote1 = data.quote1
    task.procurementTask.quote2 = data.quote2
    task.procurementTask.receipt = data.receipt
  },
}

export default procurementHandler
