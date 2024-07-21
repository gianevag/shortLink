import { createShortLink } from "@/actions/shortLink";
import { ShortlinkForm } from "@/components/form/shortlinkForm";

export default function CreateLink({
  searchParams,
}: {
  searchParams: {
    originalUrl?: string;
    isActive?: boolean;
    description?: string;
  };
}) {
  return (
    <ShortlinkForm
      title="Create Short Link Form"
      buttonLabel="Create Short Link"
      onSubmitAction={createShortLink}
      {...searchParams}
    />
  );
}
