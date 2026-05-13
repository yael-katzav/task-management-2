import { TextField } from "@mui/material"
import { Controller, type Control } from "react-hook-form"
import { TaskType } from "@shared/task/task-type.enum"
import { taskFieldsByType } from "../task.config"
import type { TaskFormValues } from "./taskForm.types"

type Props = {
  control: Control<TaskFormValues>
  selectedType: TaskType | ""
  selectedStatus: number | ""
  isEdit: boolean
}

export function TaskDetailsFields({
  control,
  selectedType,
  selectedStatus,
  isEdit,
}: Props) {
  if (!isEdit || !selectedType) return null

  const relevantFields = taskFieldsByType[selectedType]

  const isFieldRequired = (requiredFromStatus: number) => {
    if (!selectedStatus) return false

    return Number(selectedStatus) >= requiredFromStatus
  }

  return (
    <>
      {relevantFields.map((fieldConfig) => {
        const required = isFieldRequired(fieldConfig.requiredFromStatus)
        return (
          <Controller
            key={fieldConfig.name}
            name={`details.${fieldConfig.name}`}
            control={control}
            rules={{
              required: required ? `${fieldConfig.label} is required` : false,
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={fieldConfig.label}
                required={required}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        )
      })}
    </>
  )
}
