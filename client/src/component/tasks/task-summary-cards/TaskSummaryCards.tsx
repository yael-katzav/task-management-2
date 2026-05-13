import { Box, Paper, Stack, Typography } from "@mui/material"
import type { TaskResponse } from "../../../types/task/tasks.type"
import { getSummaryItems } from "./TaskSummaryCards.const"

type Props = {
  tasks: TaskResponse[]
}

export default function TaskSummaryCards({ tasks }: Props) {
  const items = getSummaryItems(tasks)

  return (
    <Box className="summary-grid">
      {items.map((item) => (
        <Paper key={item.label} className={`summary-card ${item.className}`}>
          <Stack direction="row" spacing={2}>
            <Box className="summary-icon">{item.icon}</Box>
            <Box>
              <Typography className="summary-label">{item.label}</Typography>
              <Typography className="summary-value">{item.value}</Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Box>
  )
}
