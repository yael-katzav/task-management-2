import { MenuItem, TextField } from "@mui/material"
import { Controller, type Control } from "react-hook-form"
import { useUsers } from "../../../api/useUsers"
import { taskTypeOptions } from "../task.config"
import type { TaskFormValues } from "./taskForm.types"

type Props = {
  control: Control<TaskFormValues>
  isEdit: boolean
}

export function TaskBaseFields({ control, isEdit }: Props) {
  const { data: users = [] } = useUsers()

  return (
    <>
      <Controller
        name="type"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Task Type"
            disabled={isEdit}
            fullWidth
          >
            {taskTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="assignedUserId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} select label="Assigned User" fullWidth>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </>
  )
}
