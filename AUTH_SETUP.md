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
5. **Authorised JavaScript origins:**
   - `http://localhost:3000`
   - `https://kitfolk.com`
   - `https://app.kitfolk.com`
6. **Authorised redirect URIs:**
   - `http://localhost:3000/api/auth/callback/google`
   - `https://kitfolk.com/api/auth/callback/google`
   - `https://app.kitfolk.com/api/auth/callback/google`
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

Add the same three variables under **Project Settings → Environment Variables**
for both Preview and Production. Vercel auto-sets `AUTH_URL` per deploy URL,
so you don't need to set it manually unless you're behind a custom proxy.

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
