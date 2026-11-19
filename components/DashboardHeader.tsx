interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;  
}

export default function DashboardHeader({
    title = "Dashboard",
    subtitle = "Welcome back! Here is an overview of your study progress.",
    actionLabel = "Add task",
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    {title}
                </h1>
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
    
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bluw-700"
            >
                {actionLabel}
            </button>
        </div>
    );
} 