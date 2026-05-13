import AddIcon from "@mui/icons-material/Add"
import { Box, Button, Stack, Typography } from "@mui/material"
import "sweetalert2/dist/sweetalert2.min.css"
import type { TasksView } from "../../api/useTasks"
import type { TaskResponse } from "../../types/task/tasks.type"
import "../../App.css"
import AssignedToField from "./AssignedToField"

type Props = {
  setTasksView: (view: TasksView) => void
  tasksView: TasksView
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskResponse | null>>
}

const TaskManagementPageHeader: React.FC<Props> = ({
  setTasksView,
  tasksView,
  setOpenDialog,
  setSelectedTask,
}) => {
  const handleCreate = () => {
    setSelectedTask(null)
    setOpenDialog(true)
  }

  return (
    <Box className="page-header">
      <Box>
        <Typography variant="h4" className="page-title">
          Task Management
        </Typography>
      </Box>
      <Stack direction="row" spacing={2}>
        <AssignedToField setTasksView={setTasksView} tasksView={tasksView} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Create Task
        </Button>
      </Stack>
    </Box>
  )
}

export default TaskManagementPageHeader
