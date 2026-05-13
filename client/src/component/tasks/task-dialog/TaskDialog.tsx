import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material"
import type { TaskResponse } from "../../../types/task/tasks.type"
import { TaskBaseFields } from "./TaskBaseFields"
import { TaskDetailsFields } from "./TaskDetailsFields"
import { TaskStatusField } from "./TaskStatusField"
import { useTaskForm } from "./useTaskForm"

type Props = {
  open: boolean
  task: TaskResponse | null
  onClose: () => void
}

export function TaskDialog({ open, task, onClose }: Props) {
  const {
    form: {
      control,
      handleSubmit,
      watch,
      formState: { isValid },
    },
    isEdit,
    isSaving,
    onSubmit,
  } = useTaskForm({ open, task, onClose })

  const selectedType = watch("type")
  const selectedStatus = watch("status")

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TaskBaseFields control={control} isEdit={isEdit} />
          <TaskStatusField
            control={control}
            task={task}
            selectedType={selectedType}
          />
          <TaskDetailsFields
            control={control}
            selectedType={selectedType}
            selectedStatus={selectedStatus}
            isEdit={isEdit}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          disabled={!isValid || isSaving}
          onClick={handleSubmit(onSubmit)}
        >
          {isEdit ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
