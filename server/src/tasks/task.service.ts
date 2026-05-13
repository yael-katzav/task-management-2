import { TaskType } from "@shared/task/task-type.enum"
import { ChangeTaskStatusDto, CreateTaskDto } from "@shared/task/task.type"
import { BadRequestError } from "src/errors/BadRequestError.error"
import { UserEntity } from "src/users/user.entity"
import { AppDataSource } from "../data-source"
import { DevelopmentTaskEntity } from "../development-tasks/development-task.entity"
import { ProcurementTaskEntity } from "../procurement-tasks/procurement-task.entity"
import { TASK_HANDLERS } from "./handlers.const"
import { TaskEntity } from "./task.entity"

const taskRepository = AppDataSource.getRepository(TaskEntity)
const userRepository = AppDataSource.getRepository(UserEntity)

const TASK_RELATIONS = {
  assignedUser: true,
  developmentTask: true,
  procurementTask: true,
} as const

const getAll = () =>
  taskRepository.find({
    relations: TASK_RELATIONS,
  })

const getByUserId = (userId: number) =>
  taskRepository.find({
    where: {
      assignedUserId: userId,
    },
    relations: TASK_RELATIONS,
  })

const getById = (taskId: string) =>
  taskRepository.findOne({
    where: {
      id: taskId,
    },
    relations: TASK_RELATIONS,
  })

const validateAssignedUserExists = async (assignedUserId: number) => {
  const userExists = await userRepository.exists({
    where: {
      id: assignedUserId,
    },
  })

  if (!userExists) {
    throw new BadRequestError("Assigned user does not exist.")
  }
}

const createTask = async ({ type, assignedUserId }: CreateTaskDto) => {
  await validateAssignedUserExists(assignedUserId)

  const task = taskRepository.create({
    type,
    assignedUserId,
    status: 1,
    isClosed: false,
  })

  if (type === TaskType.Development) {
    task.developmentTask = new DevelopmentTaskEntity()
  }

  if (type === TaskType.Procurement) {
    task.procurementTask = new ProcurementTaskEntity()
  }

  await taskRepository.save(task)

  return getById(task.id)
}

const changeStatus = async (
  taskId: string,
  { newStatus, assignedUserId, data }: ChangeTaskStatusDto
) => {
  const task = await getById(taskId)

  if (!task) {
    throw new BadRequestError("Task not found.")
  }

  if (task.isClosed) {
    throw new BadRequestError("Closed task is immutable.")
  }

  if (newStatus > task.status + 1) {
    throw new BadRequestError("Forward status moves must be sequential.")
  }

  await validateAssignedUserExists(assignedUserId)

  const handler = TASK_HANDLERS[task.type]

  handler.validateStatusData(newStatus, data)

  handler.applyData(task, data)

  task.status = newStatus
  task.assignedUserId = assignedUserId

  await taskRepository.save(task)

  return getById(task.id)
}

const closeTask = async (taskId: string) => {
  const task = await getById(taskId)

  if (!task) {
    throw new BadRequestError("Task not found.")
  }

  if (task.isClosed) {
    throw new BadRequestError("Task is already closed.")
  }

  const handler = TASK_HANDLERS[task.type]

  if (task.status !== handler.finalStatus) {
    throw new BadRequestError("Task can only be closed at final status.")
  }

  task.isClosed = true

  await taskRepository.save(task)
}

export default {
  getAll,
  getById,
  getByUserId,
  createTask,
  changeStatus,
  closeTask,
}
