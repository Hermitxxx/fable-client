<div align="center">

<svg viewBox="0 0 700 120" xmlns="http://www.w3.org/2000/svg" width="700" height="120">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;display=swap');
      .title { font-family: 'Playfair Display', Georgia, serif; font-size: 56px; font-weight: 700; fill: #C084FC; }
      .sub   { font-family: 'Courier New', monospace; font-size: 15px; fill: #A78BFA; letter-spacing: 3px; }
      .cursor { fill: #C084FC; }

      /* Draw animation for each letter of FABLE */
      @keyframes fadeUp {
        0%   { opacity: 0; transform: translateY(18px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      @keyframes slideIn {
        0%   { opacity: 0; letter-spacing: 12px; }
        100% { opacity: 1; letter-spacing: 3px; }
      }

      #f { animation: fadeUp 0.4s ease 0.1s both; }
      #a { animation: fadeUp 0.4s ease 0.3s both; }
      #b { animation: fadeUp 0.4s ease 0.5s both; }
      #l { animation: fadeUp 0.4s ease 0.7s both; }
      #e { animation: fadeUp 0.4s ease 0.9s both; }
      #cursor { animation: blink 1s step-start 1.2s infinite; }
      #sub    { animation: slideIn 0.8s ease 1.3s both; }
    </style>
  </defs>

  <!-- Background pill -->
  <rect x="0" y="0" width="700" height="120" rx="14" fill="#0d1117"/>

  <!-- Book emoji -->
  <text x="48" y="76" font-size="44" text-anchor="middle">📚</text>

  <!-- Animated letters -->
  <text y="78" text-anchor="start">
    <tspan id="f" class="title" x="95">F</tspan><tspan id="a" class="title">a</tspan><tspan id="b" class="title">b</tspan><tspan id="l" class="title">l</tspan><tspan id="e" class="title">e</tspan>
  </text>

  <!-- Blinking cursor -->
  <text id="cursor" class="title cursor" x="258" y="78">|</text>

  <!-- Subtitle -->
  <text id="sub" class="sub" x="350" y="105" text-anchor="middle">DISCOVER · READ · SHARE ORIGINAL EBOOKS</text>
</svg>

<br/>

<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />

<br/><br/>

> **Fable** is a digital ebook-sharing platform that bridges the gap between passionate writers and eager readers — powered by the modern MERN stack with Next.js, Stripe payments, and role-based dashboards.

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Fable-C084FC?style=for-the-badge)](YOUR_LIVE_URL_HERE)
[![Client Repo](https://img.shields.io/badge/💻_Client-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Hermitxxx/fable-client)
[![Server Repo](https://img.shields.io/badge/🖥️_Server-GitHub-181717?style=for-the-badge&logo=github)](YOUR_SERVER_REPO_HERE)

</div>

---

## ✨ Features at a Glance

<table>
<tr>
<td width="50%">

### 👤 For Readers
- Browse & discover ebooks by genre
- Purchase ebooks via **Stripe Checkout**
- Track purchase & reading history
- Bookmark ebooks for later
- Google OAuth + JWT authentication

</td>
<td width="50%">

### ✍️ For Writers
- Upload & manage your own ebooks
- Publish / unpublish / edit / delete
- Cover image hosting via **imgBB**
- View detailed sales history
- One-time verification to get started

</td>
</tr>
<tr>
<td>

### 🛡️ For Admins
- Manage all users & roles
- Oversee every ebook on the platform
- View all transactions in one place
- Analytics dashboard with charts

</td>
<td>

### 🎨 UI / UX Highlights
- Framer Motion animations throughout
- Skeleton loaders & smooth transitions
- Fully responsive (mobile → desktop)
- Custom 404 & error boundary pages
- Staggered card reveals on scroll

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 16 (App Router) |
| **UI Library** | HeroUI + Tailwind CSS v4 |
| **Authentication** | BetterAuth (Email/Password + Google OAuth) |
| **Animation** | Motion (Framer Motion) |
| **Payments** | Stripe + @stripe/stripe-js |
| **Image Hosting** | imgBB API |
| **Icons** | Lucide React · React Icons · Iconify |
| **Toast Notifications** | React Hot Toast |
| **Database Driver** | MongoDB (via @better-auth/mongo-adapter) |

---

## 📦 NPM Packages Used

```json
"dependencies": {
  "@better-auth/mongo-adapter": "^1.6.19",
  "@gravity-ui/icons":          "^2.18.0",
  "@heroui/react":               "^3.2.1",
  "@heroui/styles":              "^3.2.1",
  "@iconify/react":              "^6.0.2",
  "@stripe/stripe-js":           "^9.8.0",
  "better-auth":                 "^1.6.19",
  "lucide-react":                "^1.21.0",
  "mongodb":                     "^7.3.0",
  "motion":                      "^12.41.0",
  "next":                        "^16.2.9",
  "react":                       "19.2.4",
  "react-dom":                   "19.2.4",
  "react-hot-toast":             "^2.6.0",
  "react-icons":                 "^5.6.0",
  "stripe":                      "^22.3.0"
}
```

---

## 🗂️ Project Structure

```
fable-client/
├── app/
│   ├── (auth)/             # Login & Register pages
│   ├── (main)/             # Home, Browse, Ebook Details
│   ├── dashboard/
│   │   ├── user/           # Reader dashboard
│   │   ├── writer/         # Writer dashboard
│   │   └── admin/          # Admin dashboard
│   └── layout.js
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── home/               # Hero, Featured, Genres sections
│   └── dashboard/          # Charts, tables, forms
└── public/
    └── people/             # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- imgBB API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Hermitxxx/fable-client.git
cd fable-client

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root with the following:

```env
# App
NEXT_PUBLIC_API_URL=your_backend_url

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# BetterAuth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# imgBB
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

> ⚠️ **Never commit `.env.local` to version control.** It is already listed in `.gitignore`.

---

## 👥 User Roles & Demo Credentials

| Role | Email | Password |
|---|---|---|
| 🛡️ Admin | `admin@fable.com` | `Admin@123` |
| ✍️ Writer | Register → choose Writer role | — |
| 👤 Reader | Register → choose User role | — |

---

## 📸 Pages Overview

| Page | Access |
|---|---|
| `/` | Public — Hero, Featured Ebooks, Top Writers, Genres |
| `/browse` | Public — Search, filter, paginate all ebooks |
| `/ebook/[id]` | Public (purchase requires login) |
| `/dashboard/user` | Authenticated Readers |
| `/dashboard/writer` | Authenticated Writers |
| `/dashboard/admin` | Admin only |

---

## 🌐 Deployment

The client is deployed on **Vercel**. The server runs on a separate Express.js backend hosted independently.

- ✅ No CORS errors on production
- ✅ Private routes persist on page reload (JWT in cookies)
- ✅ All dynamic routes handle 404 gracefully
- ✅ Environment variables secured via Vercel dashboard

---

<div align="center">

**Made with 📖 and lots of ☕ by [Hermitxxx](https://github.com/Hermitxxx)**

<svg viewBox="0 0 500 44" xmlns="http://www.w3.org/2000/svg" width="500" height="44">
  <defs>
    <style>
      @keyframes pulse { 0%,100%{opacity:.7} 50%{opacity:1} }
      .ft { font-family:'Courier New',monospace; font-size:13px; fill:#A78BFA; letter-spacing:1.5px; animation: pulse 2.5s ease-in-out infinite; }
    </style>
  </defs>
  <rect width="500" height="44" rx="8" fill="#0d1117"/>
  <text class="ft" x="250" y="27" text-anchor="middle">✨ Thanks for visiting Fable · Happy Reading 📚 ✨</text>
</svg>

</div>