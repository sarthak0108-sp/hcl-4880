import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import api from "./api";

const inputBase =
  "w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400";

const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const PostForm = ({ onCreated }) => {
  const submitAction = async (prev, formData) => {
    const title = formData.get("title")?.trim();
    const content = formData.get("content")?.trim();

    if (!title || !content) {
      return {
        error: "Add a title and some content before publishing.",
        msg: "",
        title: title || "",
        content: content || "",
      };
    }

    try {
      await api.post("/posts", { title, content });
      await onCreated?.(); // reloads posts and moves back to the home page

      return { error: null, msg: "Published.", title: "", content: "" };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "We couldn't publish your post. Please try again.",
        msg: "",
        title,
        content,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
    title: "",
    content: "",
  });

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Give it a clear title"
          defaultValue={state.title}
          required
          disabled={isPending}
          className={`${inputBase} font-serif text-lg`}
        />
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>
          Content
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="What do you want to say?"
          rows={12}
          defaultValue={state.content}
          required
          disabled={isPending}
          className={`${inputBase} resize-y font-serif text-base leading-7`}
        ></textarea>
      </div>

      <SubmitButton pendingText="Publishing...">Publish post</SubmitButton>

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </p>
      )}
    </form>
  );
};

export default PostForm;