import TaskList from "@/components/tasks/TaskList";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata = {
  title: "My Tasks | StudyFlow",
  description: "Manage your academic tasks and deadlines.",
};

export default function TasksPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            Academic workload
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Tasks</h1>

          <p className="mt-2 text-slate-500">
            Organize your assignments and keep track of your deadlines.
          </p>
        </div>

        <ButtonLink href="/tasks/new">+ New Task</ButtonLink>
      </header>

      <TaskList />
    </main>
  );
}
