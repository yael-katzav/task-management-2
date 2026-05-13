import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material"
import "sweetalert2/dist/sweetalert2.min.css"
import type { TasksView } from "../../api/useTasks"
import "../../App.css"
import type { TaskResponse } from "../../types/task/tasks.type"
import AssignedToField from "./AssignedToField"

type Props = {
  setTasksView: (view: TasksView) => void
  tasksView: TasksView
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskResponse | null>>
  setIncludeClosed: React.Dispatch<React.SetStateAction<boolean>>
  includeClosed: boolean
}

const TaskManagementPageHeader: React.FC<Props> = ({
  setTasksView,
  tasksView,
  setOpenDialog,
  setSelectedTask,
  setIncludeClosed,
  includeClosed,
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
        <FormControlLabel
          control={
            <Switch
              checked={includeClosed}
              onChange={(event) => setIncludeClosed(event.target.checked)}
            />
          }
          label="Include closed"
        />
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
