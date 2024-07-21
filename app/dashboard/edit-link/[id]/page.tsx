import { updateShortLink } from "@/actions/shortLink";
import { ShortlinkForm } from "@/components/form/shortlinkForm";
import { getShortLinkById } from "@/queries/shortlink";
import { redirect } from "next/navigation";

export default async function EditLink({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // use direct query because this is a server component
  const shortLink = await getShortLinkById(params.id);

  if (!shortLink) {
    redirect("/dashboard");
  }

  return (
    <ShortlinkForm
      title="Edit Short Link Form"
      buttonLabel="Edit"
      onSubmitAction={updateShortLink}
      originalUrl={shortLink?.originalUrl}
      isActive={shortLink?.isActive}
      description={shortLink?.description || ""}
      id={params.id}
    />
  );
}
