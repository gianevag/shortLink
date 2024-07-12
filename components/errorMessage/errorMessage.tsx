export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p
      id="standard_error_help"
      className="mt-2 mb-4 text-xs text-red-600 dark:text-red-400"
    >
      <span className="font-medium">Oh, snapp! </span>
      {message}.
    </p>
  );
};
