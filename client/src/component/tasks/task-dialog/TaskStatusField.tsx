import { MenuItem, TextField } from "@mui/material"
import { Controller, type Control } from "react-hook-form"
import type { TaskResponse } from "../../../types/task/tasks.type"
import { TaskType } from "@shared/task/task-type.enum"

import { taskStatusesByType } from "../task.config"
import type { TaskFormValues } from "./taskForm.types"

type Props = {
  control: Control<TaskFormValues>
  task: TaskResponse | null
  selectedType: TaskType | ""
}

export function TaskStatusField({ control, task, selectedType }: Props) {
  if (!task || !selectedType) return null

  const relevantStatuses = taskStatusesByType[selectedType]

  const isStatusDisabled = (statusValue: number) => {
    return statusValue > task.status + 1
  }

  return (
    <Controller
      name="status"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField {...field} select label="Status" fullWidth>
          {relevantStatuses.map((status) => (
            <MenuItem
              key={status.value}
              value={status.value}
              disabled={isStatusDisabled(status.value)}
            >
              {status.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}
