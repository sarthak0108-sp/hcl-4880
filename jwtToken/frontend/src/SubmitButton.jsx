import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children = "Submit",
  pendingText = "Submitting securely...",
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`inline-flex w-full cursor-pointer items-center justify-center gap-2
        rounded-lg px-6 py-2.5 text-sm font-semibold text-white
        shadow-sm transition duration-200
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30
        disabled:cursor-not-allowed
        ${
          pending
            ? "bg-indigo-400 dark:bg-indigo-500/60"
            : "bg-indigo-600 hover:bg-indigo-500 hover:shadow-md active:scale-[0.98] motion-reduce:active:scale-100"
        }`}
    >
      {pending && (
        <svg
          className="h-4 w-4 motion-safe:animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      <span aria-live="polite">{pending ? pendingText : children}</span>
    </button>
  );
};

export default SubmitButton;