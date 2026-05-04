import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

type SearchParams = Promise<{ from?: string; error?: string }>;

const ERROR_COPY: Record<string, string> = {
  OAuthAccountNotLinked:
    "That email is already in KitFolk through another sign-in. Use the original method.",
  AccessDenied: "Sign-in cancelled. Try again.",
  Configuration:
    "Sign-in isn't configured yet. Add Google credentials to .env.local.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  const { from, error } = await searchParams;

  if (session) {
    redirect(from && from.startsWith("/") ? from : "/discover");
  }

  return (
    <div className="bg-bg text-ink relative flex min-h-dvh flex-col">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />

      <header className="relative flex items-center justify-between px-4 py-4">
        <Link href="/" className="serif text-ink text-xl">
          KitFolk
        </Link>
        <span className="mono text-mute text-[11px] tracking-widest">
          EARLY ACCESS
        </span>
      </header>

      <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 pb-16">
        <p className="label text-flare">● SIGN IN</p>
        <h1 className="serif text-ink mt-3 text-4xl leading-[1.05]">
          Welcome back to KitFolk.
        </h1>
        <p className="text-mute mt-3 text-[14px] leading-relaxed">
          Trust isn&rsquo;t assumed. It&rsquo;s earned, layered and visible — starting with
          who you say you are.
        </p>

        {error && ERROR_COPY[error] && (
          <p className="border-rec/40 bg-rec/10 text-bone mt-6 border px-3 py-2 text-[13px]">
            {ERROR_COPY[error]}
          </p>
        )}

        <form
          action={async () => {
            "use server";
            await signIn("google", {
              redirectTo:
                from && from.startsWith("/") ? from : "/onboarding",
            });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="bg-ink text-bg flex w-full items-center justify-center gap-3 px-5 py-4 text-[15px] tracking-tight transition-opacity hover:opacity-90"
          >
            <GoogleMark />
            Continue with Google
          </button>
        </form>

        <div className="text-mute mt-8 grid grid-cols-3 items-center gap-3 text-center">
          <span className="bg-rule h-px" />
          <span className="label">OR</span>
          <span className="bg-rule h-px" />
        </div>

        <button
          disabled
          className="border-rule-strong text-mute label mt-8 w-full cursor-not-allowed border px-5 py-4 opacity-60"
        >
          Use a work email — invite required
        </button>

        <p className="text-dim mt-6 text-center text-[12px] leading-relaxed">
          By continuing you agree to the{" "}
          <Link href="/" className="text-mute hover:text-ink underline-offset-2 hover:underline">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-mute hover:text-ink underline-offset-2 hover:underline">
            privacy notice
          </Link>
          .
        </p>
      </main>

      <footer className="relative px-4 pb-6">
        <div className="text-dim flex items-center justify-between text-[11px]">
          <Link href="/" className="hover:text-ink">
            ← Marketing site
          </Link>
          <span className="mono tracking-widest">CURATED · INVITE-BASED</span>
        </div>
      </footer>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.908c1.702-1.567 2.685-3.874 2.685-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}
