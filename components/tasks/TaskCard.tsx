"use client";

import Link from "next/link";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: Task["id"], status: TaskStatus) => void;
  onDelete: (id: Task["id"]) => void;
  disabled?: boolean;
}

const priorityVariants: Record<TaskPriority, "default" | "warning" | "danger"> = {
  low: "default",
  medium: "warning",
  high: "danger",
};

const statusVariants: Record<TaskStatus, "default" | "primary" | "success"> = {
  pending: "default",
  in_progress: "primary",
  completed: "success",
};

const statusLabels: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(year, month - 1, day));
}

function getToday(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function TaskCard({
  task,
  onStatusChange,
  onDelete,
  disabled = false,
}: TaskCardProps) {
  const isCompleted = task.status === "completed";

  const isOverdue = task.dueDate !== null && task.dueDate < getToday() && !isCompleted;

  const nextStatus: TaskStatus = isCompleted ? "pending" : "completed";

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* TASK INFORMATION */}
        <div className="min-w-0 flex-1">
          {/* PRIORITY AND STATUS */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant={priorityVariants[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
            </Badge>

            <Badge variant={statusVariants[task.status]}>{statusLabels[task.status]}</Badge>

            {isOverdue && <Badge variant="danger">Overdue</Badge>}
          </div>

          {/* TITLE */}
          <Link
            href={`/tasks/${task.id}`}
            className={`text-lg font-semibold text-slate-900 hover:text-blue-600 ${
              isCompleted ? "line-through text-slate-500" : ""
            }`}
          >
            {task.title}
          </Link>

          {/* COURSE */}
          {task.course && <p className="mt-1 text-sm font-medium text-slate-600">{task.course}</p>}

          {/* DESCRIPTION */}
          {task.description && <p className="mt-2 text-sm text-slate-500">{task.description}</p>}

          {/* DUE DATE AND DURATION */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            {task.dueDate && (
              <span>
                Due:{" "}
                <span className={isOverdue ? "font-medium text-red-600" : ""}>
                  {formatDate(task.dueDate)}
                </span>
              </span>
            )}

            {task.estimatedDuration !== null && <span>{task.estimatedDuration} min</span>}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={() => onStatusChange(task.id, nextStatus)}
          >
            {isCompleted ? "Reopen" : "Complete"}
          </Button>

          <Button
            variant="danger"
            size="sm"
            disabled={disabled}
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
