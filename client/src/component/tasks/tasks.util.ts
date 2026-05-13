import type { UseMutationResult } from "@tanstack/react-query"
import Swal from "sweetalert2"
import type { TaskResponse } from "../../types/task/tasks.type"
import { finalStatusByTaskType } from "./task.config"

export const handleCloseTaskClick = async (
  event: React.MouseEvent,
  task: TaskResponse,
  closeTask: UseMutationResult<void, Error, string, unknown>
) => {
  event.stopPropagation()

  if (task.isClosed) {
    await Swal.fire({
      icon: "info",
      title: "Task already closed",
      text: "This task is already closed.",
      confirmButtonText: "OK",
    })

    return
  }

  const finalStatus = finalStatusByTaskType[task.type]

  if (task.status !== finalStatus) {
    await Swal.fire({
      icon: "warning",
      title: "Cannot close task",
      text: "Task can only be closed at the final status.",
      confirmButtonText: "OK",
    })

    return
  }

  const result = await Swal.fire({
    icon: "question",
    title: "Close task?",
    text: "Are you sure you want to close this task?",
    showCancelButton: true,
    confirmButtonText: "Yes, close it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d32f2f",
  })

  if (!result.isConfirmed) return

  await closeTask.mutateAsync(task.id)

  await Swal.fire({
    icon: "success",
    title: "Task closed",
    text: "The task was closed successfully.",
    confirmButtonText: "OK",
  })
}
