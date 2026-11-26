"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import type { Task, TaskInput, TaskPriority, TaskStatus } from "@/types/task";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";

interface TaskFormProps {
  mode: "create" | "edit";
  task?: Task;
}

interface TaskFormValues {
  title: string;
  course: string;
  description: string;
  dueDate: string;
  estimatedDuration: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export default function TaskForm({ mode, task }: TaskFormProps) {
  const router = useRouter();

  const isEditing = mode === "edit";

  const [values, setValues] = useState<TaskFormValues>({
    title: task?.title ?? "",
    course: task?.course ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
    estimatedDuration: task?.estimatedDuration?.toString() ?? "",
    priority: task?.priority ?? "medium",
    status: task?.status ?? "pending",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPDATE FORM VALUES
  function updateField<K extends keyof TaskFormValues>(field: K, value: TaskFormValues[K]) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  // SUBMIT FORM
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!values.title.trim()) {
      setError("A title is required.");
      return;
    }

    if (isEditing && !task) {
      setError("Task information is missing.");
      return;
    }

    const duration =
      values.estimatedDuration.trim() === "" ? null : Number(values.estimatedDuration);

    if (duration !== null && (!Number.isInteger(duration) || duration <= 0)) {
      setError("Estimated duration must be a positive number of minutes.");
      return;
    }

    const payload: TaskInput = {
      title: values.title.trim(),
      course: values.course.trim() || null,
      description: values.description.trim() || null,
      dueDate: values.dueDate || null,
      estimatedDuration: duration,
      priority: values.priority,
      status: values.status,
    };

    setIsSubmitting(true);

    try {
      const url = isEditing ? `/api/tasks/${task!.id}` : "/api/tasks";

      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "Unable to save task.";

        throw new Error(message);
      }

      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save task.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ERROR MESSAGE */}
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* TITLE */}
        <div>
          <label htmlFor="title" className={labelClass}>
            Title <span className="text-red-600">*</span>
          </label>

          <Input
            id="title"
            name="title"
            type="text"
            value={values.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="e.g. Complete Chemistry Assignment"
            maxLength={150}
            required
          />
        </div>

        {/* COURSE */}
        <div>
          <label htmlFor="course" className={labelClass}>
            Course
          </label>

          <Input
            id="course"
            name="course"
            type="text"
            value={values.course}
            onChange={(event) => updateField("course", event.target.value)}
            placeholder="e.g. Organic Chemistry"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>

          <Textarea
            id="description"
            name="description"
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Add details about this task..."
            rows={4}
          />
        </div>

        {/* DUE DATE AND DURATION */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="dueDate" className={labelClass}>
              Due Date
            </label>

            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={values.dueDate}
              onChange={(event) => updateField("dueDate", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="estimatedDuration" className={labelClass}>
              Estimated Duration (minutes)
            </label>

            <Input
              id="estimatedDuration"
              name="estimatedDuration"
              type="number"
              min="1"
              step="1"
              value={values.estimatedDuration}
              onChange={(event) => updateField("estimatedDuration", event.target.value)}
              placeholder="e.g. 60"
            />
          </div>
        </div>

        {/* PRIORITY AND STATUS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="priority" className={labelClass}>
              Priority
            </label>

            <Select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={(event) => updateField("priority", event.target.value as TaskPriority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>

          {isEditing && (
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>

              <Select
                id="status"
                name="status"
                value={values.status}
                onChange={(event) => updateField("status", event.target.value as TaskStatus)}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>
          )}
        </div>

        {/* FORM ACTIONS */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <ButtonLink href="/tasks" variant="secondary">
            Cancel
          </ButtonLink>

          <Button type="submit" loading={isSubmitting}>
            {isEditing ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
