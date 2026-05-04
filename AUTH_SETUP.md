# Auth setup

KitFolk uses [Auth.js v5](https://authjs.dev/) (next-auth) with Google as the
only sign-in provider. Sessions are JWT-only (no database needed for v1).

## 1. Generate `AUTH_SECRET`

```bash
openssl rand -base64 32
```

## 2. Create a Google OAuth client

1. Open [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials).
2. If you don't have a project, create one called `kitfolk`.
3. Configure the **OAuth consent screen** (External · "KitFolk" · your support email).
   Add scopes: `email`, `profile`, `openid` (default).
4. Create credentials → **OAuth client ID** → **Web application**.
5. **Authorised JavaScript origins** (add every host you will use, including Vercel’s default domain):
   - `http://localhost:3000`
   - `https://kitfolk.com`
   - `https://app.kitfolk.com`
   - `https://kitfolk.vercel.app` (or your `*.vercel.app` production URL)
6. **Authorised redirect URIs** (must match the host in the address bar **exactly**):
   - `http://localhost:3000/api/auth/callback/google`
   - `https://kitfolk.com/api/auth/callback/google`
   - `https://app.kitfolk.com/api/auth/callback/google`
   - `https://kitfolk.vercel.app/api/auth/callback/google`
7. Copy the **Client ID** and **Client secret**.

## 3. Drop them in `.env.local`

```bash
cp .env.example .env.local
```

Fill in:

```
AUTH_SECRET=<from step 1>
AUTH_GOOGLE_ID=<client id>
AUTH_GOOGLE_SECRET=<client secret>
```

## 4. Vercel

Add the same three variables under **Project Settings → Environment Variables**:

| Variable | Value |
|----------|--------|
| `AUTH_SECRET` | Same as local (openssl output) |
| `AUTH_GOOGLE_ID` | Google “Client ID” |
| `AUTH_GOOGLE_SECRET` | Google “Client secret” |

**Environment scope (this trips people up):**

- Whichever **deployment** you open (`kitfolk.vercel.app`, preview branch URL, or a custom domain) only sees variables that are enabled for that **environment**.
- If you only added them under **Production** but you are opening a **Preview** deployment (e.g. a PR URL), auth will behave as if credentials are missing (`?error=Configuration` on `/sign-in`).
- Safest: enable **Production** and **Preview** for all three (same values), then redeploy or “Redeploy” so the new env is baked in.

**Optional but useful on `*.vercel.app`:**

- Set **`AUTH_URL`** to the exact origin you use in the browser, e.g. `https://kitfolk.vercel.app`, so Auth.js never guesses the wrong base URL behind multiple domains.

Vercel usually injects a sensible URL per deployment; explicit `AUTH_URL` fixes edge cases with the default Vercel hostname or redirects.

## 5. Troubleshooting

| What you see | What to check |
|----------------|----------------|
| **`/sign-in` shows onboarding** (“STEP 01 / 05”, account type pickers) | You still have a **session** (you’re signed in). Incognito can inherit Google SSO on the same device, or a tab still has session cookies. Open a **fresh** incognito window, or DevTools → Application → Cookies → delete all for `kitfolk.vercel.app`, then load `/sign-in` again. Also confirm the **address bar** is `/sign-in` after load (you may have been redirected to `/onboarding`). |
| **Banner: “Sign-in isn’t configured yet”** (`?error=Configuration`) | `AUTH_SECRET` and/or `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` are missing for **this** deployment’s environment, or the deployment predates the variables — **Redeploy** after saving env. |
| **Google error `redirect_uri_mismatch`** | Google Console is missing the **exact** callback for the host you’re using (add `https://<your-host>/api/auth/callback/google`). |
| **Button there but Google fails** | Consent screen **Testing** mode only allows listed test users; add your Google account as a test user or publish the app (External review may apply). |

## How the flow works

```
Visit any /discover, /calls, /circles, /profile, /messages, /bookings, /onboarding
        │
        └─ not signed in?  →  /sign-in?from=<original path>
                              │
                              └─ Continue with Google
                                  │
                                  ├─ first time:    /onboarding
                                  └─ returning:     <original path> | /discover
```

A cookie called `kf-onboarded=1` is set when a user finishes (or skips)
onboarding, so they aren't bounced back through it on every visit. In a real
backend this would live on the user record.

## Files involved

- `src/auth.ts` — central NextAuth config (Google + JWT)
- `src/app/api/auth/[...nextauth]/route.ts` — auth route handlers
- `src/app/sign-in/page.tsx` — branded sign-in page
- `src/proxy.ts` — gates all app routes, handles redirects
- `src/app/onboarding/page.tsx` (+ `OnboardingFlow.tsx`) — prefilled from session
- `src/app/(app)/profile/page.tsx` (+ `ProfileView.tsx`) — shows real Google
  identity, sign-out wired to `signOut()` server action
