import api from "./api";
import SubmitButton from "./SubmitButton";
import { useState, useActionState } from "react";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400";

const labelClass =
  "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const EyeIcon = ({ off }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const AuthForm = ({ onLogin }) => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const submitAction = async (prevState, formData) => {
    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();

    if (!username || !password) {
      return {
        error: "Enter both a username and a password.",
        msg: "",
        username: username || "",
      };
    }

    try {
      if (mode === "register") {
        await api.post("/auth/register", { username, password });
        setMode("login");
        return {
          error: null,
          msg: "Account created. You can log in now.",
          username,
        };
      }

      // login mode
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      onLogin(username);
      return {
        error: null,
        msg: "",
        username: data.username,
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        msg: "",
        username,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
    username: "",
  });

  const isLogin = mode === "login";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <h3 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {isLogin ? "Welcome back" : "Create your account"}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {isLogin
            ? "Log in to publish posts."
            : "Pick a username and password to start posting."}
        </p>
      </div>

      {/* Mode switch */}
      <div
        role="tablist"
        aria-label="Account mode"
        className="grid grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800"
      >
        {[
          ["login", "Log in"],
          ["register", "Register"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            disabled={isPending}
            onClick={() => setMode(value)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 disabled:cursor-not-allowed ${
              mode === value
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="username" className={labelClass}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="e.g. mira"
            autoComplete="username"
            defaultValue={state.username}
            required
            disabled={isPending}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              disabled={isPending}
              className={`${inputClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-lg text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 dark:hover:text-zinc-200"
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>
        </div>
      </div>

      <SubmitButton pendingText={isLogin ? "Logging in..." : "Creating account..."}>
        {isLogin ? "Log in" : "Create account"}
      </SubmitButton>

      {state.msg && (
        <p
          role="status"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          {state.msg}
        </p>
      )}

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

export default AuthForm;