import Table from "@/components/table/table";
import { CreateLinkButton } from "./ui/buttons/buttons";
import { getShortLinks } from "@/actions/shortLink";

export default async function Dashboard() {
  const shortLinks = await getShortLinks();

  return (
    <main>
      <div className="flex justify-end mb-10">
        <CreateLinkButton />
      </div>
      <Table data={shortLinks} />
    </main>
  );
}
