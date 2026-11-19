import { useCallback, useEffect, useState } from "react";
import api from "./api";
import AuthForm from "./AuthForm";
import PostForm from "./PostForm";

/*
  Pages (hash routes, no extra library or files needed):
    #/            -> all posts
    #/post/:id    -> single post
    #/write       -> write a post (login required)
    #/login       -> login / register
*/

/* ---------- helpers ---------- */

const TONES = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
];

const toneFor = (name = "") =>
  TONES[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % TONES.length];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30";

const timeAgo = (iso) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diff = (date - Date.now()) / 1000;
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return "just now";
};

const readTime = (text = "") =>
  `${Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))} min read`;

const getPath = () => window.location.hash.replace(/^#/, "") || "/";
const navigate = (to) => {
  window.location.hash = to;
};

/* ---------- small pieces ---------- */

const Avatar = ({ name, size = "h-8 w-8 text-xs" }) => (
  <span
    aria-hidden="true"
    className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${size} ${toneFor(
      name
    )}`}
  >
    {name?.[0]?.toUpperCase() ?? "?"}
  </span>
);

const Logo = ({ className = "" }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <span
      aria-hidden="true"
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-serif text-lg font-semibold text-white"
    >
      J
    </span>
    <span className="font-serif text-lg font-semibold tracking-tight">
      JWT Blog Demo
    </span>
  </span>
);

const BackLink = ({ children }) => (
  <a
    href="#/"
    className={`-ml-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 ${focusRing}`}
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
    {children}
  </a>
);

const Skeleton = () => (
  <div className="space-y-3 py-7 motion-safe:animate-pulse" aria-hidden="true">
    <div className="h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
  </div>
);

/* ---------- navbar ---------- */

const Navbar = ({ user, onLogout }) => (
  <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
    <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
      <a
        href="#/"
        aria-label="JWT Blog Demo home"
        className={`rounded-lg text-zinc-900 dark:text-white ${focusRing}`}
      >
        <Logo />
      </a>

      <nav className="flex items-center gap-2 sm:gap-3">
        {user ? (
          <>
            <a
              href="#/write"
              className={`rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 ${focusRing}`}
            >
              Write
            </a>
            <span className="hidden items-center gap-2 pl-1 sm:flex">
              <Avatar name={user} />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {user}
              </span>
            </span>
            <button
              onClick={onLogout}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white ${focusRing}`}
            >
              Log out
            </button>
          </>
        ) : (
          <a
            href="#/login"
            className={`rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 ${focusRing}`}
          >
            Log in
          </a>
        )}
      </nav>
    </div>
  </header>
);

/* ---------- pages ---------- */

const AuthPage = ({ onLogin }) => (
  <div className="grid min-h-screen bg-zinc-50 text-zinc-800 antialiased lg:grid-cols-2 dark:bg-zinc-950 dark:text-zinc-200">
    {/* Brand panel (desktop only) */}
    <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-900 p-12 text-white lg:flex">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <Logo className="relative" />
      <div className="relative max-w-md">
        <h2 className="text-balance font-serif text-5xl font-semibold leading-[1.1] tracking-tight">
          Short writing, shared openly.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">
          Log in to publish posts and read what others are writing.
        </p>
      </div>
      <p className="relative text-sm text-zinc-500">Secured with JWT login.</p>
    </div>

    {/* Form panel */}
    <div className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Logo className="mb-10 text-zinc-900 lg:hidden dark:text-white" />

        <AuthForm onLogin={onLogin} />

        <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="#/"
            className={`rounded font-medium text-indigo-600 hover:underline dark:text-indigo-400 ${focusRing}`}
          >
            Continue without an account
          </a>
        </p>
      </div>
    </div>
  </div>
);

const HomePage = ({ user, posts, loading, error, onRetry }) => (
  <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <div className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        Posts
      </h1>
      {!loading && !error && (
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"} published
        </p>
      )}
    </div>

    {loading && (
      <div
        role="status"
        aria-label="Loading posts"
        className="divide-y divide-zinc-200 dark:divide-zinc-800"
      >
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )}

    {!loading && error && (
      <div
        role="alert"
        className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-500/30 dark:bg-red-500/10"
      >
        <p className="text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
        <button
          onClick={onRetry}
          className={`mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 ${focusRing}`}
        >
          Try again
        </button>
      </div>
    )}

    {!loading && !error && posts.length === 0 && (
      <div className="mt-10 rounded-xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <p className="font-serif text-xl font-semibold text-zinc-900 dark:text-white">
          Nothing here yet
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {user ? "Write the first post." : "Log in and write the first post."}
        </p>
        <a
          href={user ? "#/write" : "#/login"}
          className={`mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 ${focusRing}`}
        >
          {user ? "Write a post" : "Log in"}
        </a>
      </div>
    )}

    {!loading && !error && posts.length > 0 && (
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {posts.map((p) => (
          <li key={p.id}>
            <a
              href={`#/post/${p.id}`}
              className={`group -mx-3 block rounded-xl px-3 py-7 transition-colors hover:bg-white dark:hover:bg-zinc-900 ${focusRing}`}
            >
              <h2 className="text-balance font-serif text-2xl font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {p.title}
              </h2>
              <p className="mt-2 line-clamp-2 font-serif text-base leading-7 text-zinc-600 dark:text-zinc-400">
                {p.content}
              </p>
              <div className="mt-4 flex items-center gap-2.5 text-xs text-zinc-500">
                <Avatar name={p.author} size="h-6 w-6 text-[10px]" />
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {p.author}
                </span>
                <span aria-hidden="true">|</span>
                <time dateTime={p.createdAt}>{timeAgo(p.createdAt)}</time>
                <span aria-hidden="true">|</span>
                <span>{readTime(p.content)}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    )}
  </main>
);

const PostPage = ({ post, loading }) => (
  <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <BackLink>All posts</BackLink>

    {loading && (
      <div
        role="status"
        aria-label="Loading post"
        className="mt-8 space-y-4 motion-safe:animate-pulse"
      >
        <div className="h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    )}

    {!loading && !post && (
      <div className="mt-10 rounded-xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <p className="font-serif text-xl font-semibold text-zinc-900 dark:text-white">
          Post not found
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          It may have been removed, or the link is incorrect.
        </p>
      </div>
    )}

    {!loading && post && (
      <article className="mt-8">
        <h1 className="text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <Avatar name={post.author} size="h-10 w-10 text-sm" />
          <div className="text-sm leading-tight">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {post.author}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleString(undefined, {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </time>
              <span aria-hidden="true"> | </span>
              {readTime(post.content)}
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-prose whitespace-pre-line font-serif text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          {post.content}
        </div>
      </article>
    )}
  </main>
);

const WritePage = ({ onCreated }) => (
  <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
    <BackLink>Cancel</BackLink>

    <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
      Write a post
    </h1>
    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
      Your post is published as soon as you save it.
    </p>

    <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
      <PostForm onCreated={onCreated} />
    </div>
  </main>
);

/* ---------- app ---------- */

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [path, setPath] = useState(getPath);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* routing */
  useEffect(() => {
    const onChange = () => {
      setPath(getPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  // Logged-in users skip the login page; guests can't open the write page.
  const route =
    user && path === "/login" ? "/" : !user && path === "/write" ? "/login" : path;

  useEffect(() => {
    if (route !== path) window.location.replace(`#${route}`);
  }, [route, path]);

  /* data */
  const loadPosts = useCallback(async () => {
    try {
      setError("");
      const { data } = await api.get("/posts");
      setPosts(data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "We couldn't load the posts. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  /* auth */
  const handleLogin = (username) => {
    setUser(username);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/");
  };

  /* render */
  if (route === "/login") return <AuthPage onLogin={handleLogin} />;

  const postMatch = route.match(/^\/post\/(.+)$/);
  let page;

  if (route === "/write") {
    page = (
      <WritePage
        onCreated={async () => {
          await loadPosts();
          navigate("/");
        }}
      />
    );
  } else if (postMatch) {
    page = (
      <PostPage
        loading={loading}
        post={posts.find((p) => String(p.id) === postMatch[1])}
      />
    );
  } else {
    page = (
      <HomePage
        user={user}
        posts={posts}
        loading={loading}
        error={error}
        onRetry={() => {
          setLoading(true);
          loadPosts();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 antialiased dark:bg-zinc-950 dark:text-zinc-200">
      <Navbar user={user} onLogout={logout} />
      {page}
    </div>
  );
};

export default App;