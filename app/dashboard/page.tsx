import Table from "@/components/table/table";
import { CreateLinkButton } from "./ui/buttons/buttons";

export default async function Dashboard() {
  return (
    <main>
      <div className="flex justify-end mb-10">
        <CreateLinkButton />
      </div>
      <Table />
    </main>
  );
}
