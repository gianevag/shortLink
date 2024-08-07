import { signOutUser } from "@/actions/user";
import { Button } from "@/components/button/button";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="p-4 mb-6 bg-slate-50 border-b-[1px] border-slate-100 rounded-lg">
        <nav className="mx-auto max-w-screen-xl px-4 py-2.5">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <span className="self-center text-lg font-semibold whitespace-nowrap">
                Short Link{" "}
                <span className="text-xl text-gray-500">Creator</span>
              </span>
            </div>
            <div className="flex flex-grow justify-end">
              <form action={signOutUser}>
                <Button type="submit" className={"max-w-[150px]"}>
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <div className="mx-auto max-w-screen-xl px-4">{children}</div>
    </>
  );
}
