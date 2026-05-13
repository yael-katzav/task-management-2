import { Box, CircularProgress, Container, Paper, Stack } from "@mui/material"
import { useState } from "react"
import "sweetalert2/dist/sweetalert2.min.css"
import { useTasks, type TasksView } from "./api/useTasks"
import "./App.css"
import { TaskDialog } from "./component/tasks/task-dialog/TaskDialog"
import TaskManagementPageHeader from "./component/tasks/TaskManagementPageHeader"
import TaskManagementTable from "./component/tasks/TaskManagementTable"
import type { TaskResponse } from "./types/task/tasks.type"
import TaskSummaryCards from "./component/tasks/task-summary-cards/TaskSummaryCards"

function TaskManagementPage() {
  const [tasksView, setTasksView] = useState<TasksView>("all")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null)
  const [includeClosed, setIncludeClosed] = useState(false)

  const { data: tasks = [], isLoading } = useTasks(tasksView, includeClosed)

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedTask(null)
  }

  return (
    <Box className="tasks-page">
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <TaskSummaryCards tasks={tasks} />
          <TaskManagementPageHeader
            tasksView={tasksView}
            setTasksView={setTasksView}
            setOpenDialog={setOpenDialog}
            setSelectedTask={setSelectedTask}
            includeClosed={includeClosed}
            setIncludeClosed={setIncludeClosed}
          />
          {isLoading && (
            <Paper className="state-card">
              <CircularProgress />
            </Paper>
          )}
          <TaskManagementTable
            tasks={tasks}
            setOpenDialog={setOpenDialog}
            setSelectedTask={setSelectedTask}
          />
        </Stack>
      </Container>
      <TaskDialog
        open={openDialog}
        task={selectedTask}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}

export default TaskManagementPage
