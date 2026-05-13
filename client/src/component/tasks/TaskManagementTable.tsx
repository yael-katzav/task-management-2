import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import { Box, Chip, Paper, Typography } from "@mui/material"
import { type FC } from "react"
import "sweetalert2/dist/sweetalert2.min.css"
import { useCloseTask } from "../../api/useTasks"
import type { TaskResponse } from "../../types/task/tasks.type"
import { TASKS_COLUMS } from "./task.config"
import { getTaskStatusLabel } from "./taskLabels"
import { handleCloseTaskClick } from "./tasks.util"

type Props = {
  tasks: TaskResponse[]
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskResponse | null>>
}
const TaskManagementTable: FC<Props> = ({
  tasks,
  setOpenDialog,
  setSelectedTask,
}) => {
  const closeTask = useCloseTask()

  const handleEdit = (task: TaskResponse) => {
    setSelectedTask(task)
    setOpenDialog(true)
  }

  return (
    <>
      {tasks.length > 0 && (
        <Paper className="tasks-list">
          <Box className="tasks-list-header">
            {TASKS_COLUMS.map((column) => (
              <Typography key={column} className="list-column">
                {column}
              </Typography>
            ))}
          </Box>
          {tasks.map((task) => (
            <Box
              key={task.id}
              className="task-row"
              onClick={() => handleEdit(task)}
            >
              <Box className="task-main">
                <Box className="task-icon">
                  <AssignmentOutlinedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography className="task-type">
                    Type: {task.type}
                  </Typography>
                </Box>
              </Box>
              <Box className="task-cell">
                <Chip
                  size="small"
                  label={getTaskStatusLabel(task.type, task.status)}
                />
              </Box>
              <Box className="task-cell assigned-cell">
                <PersonOutlineOutlinedIcon fontSize="small" />
                <Typography>{task.assignedUser?.name}</Typography>
              </Box>
              <Box className="task-cell">
                <Chip
                  size="small"
                  label={task.isClosed ? "Closed" : "Open"}
                  color={task.isClosed ? "success" : "primary"}
                  variant={task.isClosed ? "filled" : "outlined"}
                  onClick={(event) =>
                    handleCloseTaskClick(event, task, closeTask)
                  }
                  clickable
                />
              </Box>
              <Box className="task-cell">
                <Typography sx={{ fontSize: "12px" }}>
                  {new Date(task.createdAt).toLocaleDateString()}{" "}
                  {new Date(task.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      )}
    </>
  )
}

export default TaskManagementTable
