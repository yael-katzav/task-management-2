import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined"
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined"
import type { TaskResponse } from "src/types/task/tasks.type"

export const getSummaryItems = (tasks: TaskResponse[]) => {
  const total = tasks.length
  const open = tasks.filter((task) => !task.isClosed).length
  const closed = tasks.filter((task) => task.isClosed).length
  const development = tasks.filter((task) => task.type === "Development").length
  const procurement = tasks.filter((task) => task.type === "Procurement").length

  return [
    {
      label: "Total Tasks",
      value: total,
      icon: <AssignmentTurnedInOutlinedIcon />,
      className: "summary-total",
    },
    {
      label: "Open Tasks",
      value: open,
      icon: <PendingActionsOutlinedIcon />,
      className: "summary-open",
    },
    {
      label: "Closed Tasks",
      value: closed,
      icon: <DoneAllOutlinedIcon />,
      className: "summary-closed",
    },
    {
      label: "Development / Procurement",
      value: `${development} / ${procurement}`,
      icon: <TaskAltOutlinedIcon />,
      className: "summary-types",
    },
  ]
}
