import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react"
import { Priority, Task, Status, Label } from '@prisma/client';

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "BACKLOG",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "INPROGRESS",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "CANCELED",
    label: "Canceled",
    icon: XCircle,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "LOW",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "HIGH",
    icon: ArrowUpToLine,
  },
]
