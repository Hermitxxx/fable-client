<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&size=48&duration=3000&pause=1000&color=C084FC&center=true&vCenter=true&width=600&lines=📚+Fable;Discover+%26+Read+Original+Ebooks;Where+Stories+Come+Alive" alt="Fable Typing SVG" />

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
| `/books` | Public — Search, filter, paginate all ebooks |
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

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=14&pause=1000&color=C084FC&center=true&vCenter=true&width=500&lines=Thanks+for+visiting+Fable+✨;Happy+Reading+📚" />

</div>