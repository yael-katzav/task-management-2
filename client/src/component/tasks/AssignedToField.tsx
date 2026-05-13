import { MenuItem, TextField } from "@mui/material"
import type { Dispatch, FC, SetStateAction } from "react"
import "sweetalert2/dist/sweetalert2.min.css"
import type { TasksView } from "../../api/useTasks"
import { useUsers } from "../../api/useUsers"
import "../../App.css"
import { CURRENT_USER_ID } from "./task.config"

type Props = {
  setTasksView: Dispatch<SetStateAction<TasksView>>
  tasksView: TasksView
}

const AssignedToField: FC<Props> = ({ setTasksView, tasksView }) => {
  const { data: users = [] } = useUsers()

  return (
    <TextField
      select
      size="small"
      label="assigned to"
      value={tasksView}
      onChange={(event) => {
        const value = event.target.value
        setTasksView(value === "all" ? "all" : Number(value))
      }}
      sx={{ minWidth: 180 }}
    >
      <MenuItem value="all">All Tasks</MenuItem>
      <MenuItem value={CURRENT_USER_ID}>My Tasks</MenuItem>
      {users
        .filter((user) => user.id !== CURRENT_USER_ID)
        .map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
    </TextField>
  )
}

export default AssignedToField
