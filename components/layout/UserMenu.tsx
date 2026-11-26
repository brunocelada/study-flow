import { logoutAction } from "@/app/(auth)/actions";

export default function UserMenu() {
  return (
    <form action={logoutAction}>
      <button type="submit">Sign out</button>
    </form>
  );
}
