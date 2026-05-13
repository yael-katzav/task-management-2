import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useChangeTaskStatus } from "../../../api/useChangeTaskStatus"
import { useCreateTask } from "../../../api/useTasks"
import type { TaskResponse } from "../../../types/task/tasks.type"
import type { TaskFormValues } from "./taskForm.types"

type Params = {
  open: boolean
  task: TaskResponse | null
  onClose: () => void
}

export function useTaskForm({ open, task, onClose }: Params) {
  const isEdit = Boolean(task)

  const createTask = useCreateTask()
  const changeTaskStatus = useChangeTaskStatus()

  const form = useForm<TaskFormValues>({
    mode: "onChange",
    defaultValues: {
      type: "",
      assignedUserId: "",
      status: "",
      details: {},
    },
  })

  const { reset } = form

  useEffect(() => {
    if (!open) return

    reset({
      type: task?.type ?? "",
      assignedUserId: task?.assignedUserId ?? "",
      status: task?.status ?? "",
      details: Object.fromEntries(
        Object.entries(task?.details ?? {}).map(([key, value]) => [
          key,
          String(value ?? ""),
        ])
      ),
    })
  }, [open, task, reset])

  const onSubmit = async (values: TaskFormValues) => {
    if (!values.type || !values.assignedUserId) return

    if (!isEdit) {
      await createTask.mutateAsync({
        type: values.type,
        assignedUserId: values.assignedUserId,
      })

      onClose()
      return
    }

    if (!values.status) return

    await changeTaskStatus.mutateAsync({
      taskId: task!.id,
      data: {
        newStatus: values.status,
        assignedUserId: values.assignedUserId,
        data: values.details,
      },
    })

    onClose()
  }

  return {
    form,
    isEdit,
    isSaving: createTask.isPending || changeTaskStatus.isPending,
    onSubmit,
  }
}
