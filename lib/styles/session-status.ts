// Helper to map each session status to your @theme semantic colors
import { SessionStatus } from "@/types/study-session";

export const statusStyles: Record<SessionStatus, string> = {
  scheduled: 'bg-primary-light text-primary',
  'in-progress': 'bg-warning-light text-warning',
  completed: 'bg-success-light text-success',
  cancelled: 'bg-error-light text-error',
};