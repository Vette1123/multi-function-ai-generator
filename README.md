# 🤖 multi-function-ai-generator (sadge-ai)

> Five AI tools — chat, code, image, music, video — behind one dashboard, with auth, usage limits, and a Pro plan.

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6c47ff)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635bff?logo=stripe)

### 🚀 [Try it live →](https://sadge-ai.vercel.app)

A SaaS-style playground that wires together OpenAI and Replicate behind a single dashboard. Free users get a metered quota tracked in MySQL via Prisma; Stripe handles the Pro upgrade and webhook lifecycle. Built to explore how far one Next.js 13 app can stretch across multiple AI modalities.

## ✨ Features

- **Conversation** — streaming chat backed by OpenAI via LangChain.
- **Code generation** — markdown-rendered code answers with syntax-aware output.
- **Image generation** — text-to-image through Replicate, with resolution and count controls.
- **Music generation** — text-to-audio via a Replicate music model.
- **Video generation** — text-to-video via a Replicate video model.
- **Auth & accounts** — Clerk-powered sign-in / sign-up with route protection.
- **Usage limits & Pro plan** — free-tier counter stored in Prisma + MySQL; unlimited access through a Stripe-managed subscription.
- **Stripe webhooks** — subscription state synced back to the database.
- **Live support widget** — Crisp chat embedded in the dashboard.
- **Polished UI** — shadcn/ui + Radix primitives, dark mode via `next-themes`, toasts via Sonner.

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 13 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI, `tailwindcss-animate` |
| AI | OpenAI, LangChain, Replicate |
| Auth | Clerk |
| Database | Prisma ORM + MySQL |
| Payments | Stripe (checkout + webhooks) |
| Forms & validation | React Hook Form + Zod |
| State | Zustand |
| Support | Crisp |
| Analytics | Vercel Analytics |

## 📖 Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in to access the dashboard.

### Environment variables

Create a `.env` file in the project root:

| Variable | Description |
| --- | --- |
| `OPEN_AI_API_KEY` | OpenAI API key used by the conversation and code routes. |
| `OPEN_AI_MODEL` | OpenAI model name passed to LangChain (e.g. `gpt-3.5-turbo`). |
| `REPLICATE_API_KEY` | Replicate API token for image, music, and video generation. |
| `REPLICATE_MUSIC_MODEL` | Replicate music model in `owner/name:version` form. |
| `REPLICATE_VIDEO_MODEL` | Replicate video model in `owner/name:version` form. |
| `DATABASE_URL` | MySQL connection string consumed by Prisma. |
| `STRIPE_SECRET_KEY` | Stripe secret key for checkout sessions. |
| `STRIPE_WEBHOOK_KEY` | Signing secret for the `/api/webhook` route. |
| `NEXT_PUBLIC_APP_URL` | Public base URL (used for Stripe redirects). |
| `NEXT_PUBLIC_CRISP_SDK_ID` | Crisp website ID for the support widget. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk auth keys. |

Then run Prisma against your database:

```bash
pnpm prisma generate
pnpm prisma db push
```

## 🙌 Credits

Built by [Mohamed Gado](https://mohamedgado.com).
