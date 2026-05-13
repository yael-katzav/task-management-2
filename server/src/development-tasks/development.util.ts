import { AppDataSource } from "src/data-source"
import { BadRequestError } from "src/errors/BadRequestError.error"
import { TaskHandler } from "src/tasks/task-handler.type"
import { DevelopmentTaskEntity } from "./development-task.entity"

const developmentRepository = AppDataSource.getRepository(DevelopmentTaskEntity)

const developmentHandler: TaskHandler = {
  finalStatus: 4,

  createDetailsEntity(task) {
    const developmentTask = new DevelopmentTaskEntity()
    developmentTask.task = task
    task.developmentTask = developmentTask
  },

  validateStatusData(status, data) {
    if (status >= 2 && !data.specification) {
      throw new BadRequestError("Specification is required.")
    }

    if (status >= 3 && !data.branchName) {
      throw new BadRequestError("Branch name is required.")
    }

    if (status >= 4 && !data.version) {
      throw new BadRequestError("Version is required.")
    }
  },

  applyData(task, data) {
    if (!task.developmentTask) return

    task.developmentTask.specification = data.specification
    task.developmentTask.branchName = data.branchName
    task.developmentTask.version = data.version
  },

  async saveDetails(task) {
    if (!task.developmentTask) return

    await developmentRepository.save(task.developmentTask)
  },
}

export default developmentHandler
