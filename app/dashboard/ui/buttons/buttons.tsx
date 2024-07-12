import { Button } from "@/components/button/button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export const CreateLinkButton = () => (
  <Link href="/dashboard/create-link">
    <Button>
      <PlusIcon className="size-6 inline-block mr-1" />
      Create New Short Link
    </Button>
  </Link>
);

export const BackButton = () => (
  <Link href="/dashboard">
    <Button className="w-[100px] text-red-600 bg-white items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
      Back
    </Button>
  </Link>
);
