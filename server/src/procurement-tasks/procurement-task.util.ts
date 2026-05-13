import { AppDataSource } from "src/data-source"
import { BadRequestError } from "src/errors/BadRequestError.error"
import { TaskHandler } from "src/tasks/task-handler.type"
import { ProcurementTaskEntity } from "./procurement-task.entity"

const procurementRepository = AppDataSource.getRepository(ProcurementTaskEntity)

const procurementHandler: TaskHandler = {
  finalStatus: 3,

  createDetailsEntity(task) {
    const procurementTask = new ProcurementTaskEntity()
    procurementTask.task = task
    task.procurementTask = procurementTask
  },

  validateStatusData(status, data) {
    if (status >= 2 && (!data.quote1 || !data.quote2)) {
      throw new BadRequestError("Both quotes are required.")
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

  async saveDetails(task) {
    if (!task.procurementTask) return

    await procurementRepository.save(task.procurementTask)
  },
}

export default procurementHandler
