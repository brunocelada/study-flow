import DashboardHeader from "@/components/DashboardHeader";
import OverviewCards, { type OverviewStat } from "@/components/OverviewCards";
  
const overviewStats: OverviewStat = [
    {
      label: "Tasks due today",
      value: "4",
      helper: "2 high priority",
    },
    {
      label: "Completed this week",
      value: "12",
      helper: "Up from 9 last week",
    },
    {
      label: "Active courses",
      value: "5",
      helper: "Spring semester",
    },
  ];

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <OverviewCards stats={overviewStats} />
    </div>
  );
}  