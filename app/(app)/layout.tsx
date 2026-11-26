import { redirect } from "next/navigation";

import { auth } from "@/auth";
import UserMenu from "@/components/layout/UserMenu";

export const instant = false;

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <UserMenu />
      {children}
    </>
  );
}
