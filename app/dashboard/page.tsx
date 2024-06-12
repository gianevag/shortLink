import { auth } from "@/auth";
import { Button } from "@/components/button/button";
import { signOutUser } from "@/actions/user";

export default async function Dashboard() {
  const session = await auth();

  return (
    <main>
      <h1>Dashboard</h1>
      <form action={signOutUser}>
        <Button type="submit" className={"max-w-[150px]"}>
          Sign out
        </Button>
      </form>
    </main>
  );
}
