import { ChangeTaskStatusDto, CreateTaskDto } from "@shared/task/task.type"
import { BadRequestError } from "src/errors/BadRequestError.error"
import { UserEntity } from "src/users/user.entity"
import { AppDataSource } from "../data-source"
import { TASK_HANDLERS } from "./handlers.const"
import { TaskEntity } from "./task.entity"
import { mapTaskResponse } from "./task.util"

const taskRepository = AppDataSource.getRepository(TaskEntity)
const userRepository = AppDataSource.getRepository(UserEntity)

const TASK_RELATIONS = {
  assignedUser: true,
  developmentTask: true,
  procurementTask: true,
} as const

const getAll = async () => {
  const tasks = await taskRepository.find({ relations: TASK_RELATIONS })
  return tasks.map(mapTaskResponse)
}

const getByUserId = (userId: number) =>
  taskRepository.find({
    where: {
      assignedUserId: userId,
    },
    relations: TASK_RELATIONS,
  })

const getById = async (taskId: string) => {
  const task = await taskRepository.findOne({
    where: { id: taskId },
    relations: TASK_RELATIONS,
  })

  return task ? mapTaskResponse(task) : null
}

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

  const handler = TASK_HANDLERS[type]

  handler.createDetailsEntity(task)

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

  if (Number(newStatus) > task.status + 1) {
    throw new BadRequestError("Forward status moves must be sequential.")
  }

  await validateAssignedUserExists(Number(assignedUserId))

  const handler = TASK_HANDLERS[task.type]

  handler.validateStatusData(Number(newStatus), data ?? {})
  handler.applyData(task, data ?? {})

  await handler.saveDetails(task)

  await taskRepository.update(task.id, {
    status: Number(newStatus),
    assignedUserId: Number(assignedUserId),
  })

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
