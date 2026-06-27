# 📚 Fable | Ebook Sharing & Publishing Platform

[![Live Site](https://img.shields.io/badge/Live_Site-Visit_Fable-blueviolet?style=for-the-badge)](https://your-deployed-vercel-url.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Fable** is a comprehensive digital marketplace built on the MERN stack that democratizes literature. It seamlessly bridges the gap between avid readers and independent writers by offering a secure space to publish, discover, purchase, and read premium digital ebooks.

---

## 🚀 Live Demo & Credentials

* **Live Application URL:** [fable-client.vercel.app](https://your-deployed-vercel-url.com) *(Update with your actual link)*
*
---

## ✨ Key Features

### 👤 User Roles & Dashboards
* **Reader (User):** Purchase history tracker, gallery of purchased books, bookmark system, and interactive profile.
* **Writer:** Secure dashboard to author, publish/unpublish, and edit ebooks, paired with live sales history analytics.
* **Admin Control Panel:** Complete management ecosystem over users (role toggles), global ebook library curation, and full transaction history audit trails.

### 🛠 Core Architecture
* **Secure Authentication:** Hybrid flow featuring JWT-based email/password registration and seamless OAuth via **Google Login / BetterAuth**.
* **Stripe Payment Integration:** Dynamic checkout sessions for ebook purchases with automated instant access provisioning upon successful webhook confirmation.
* **Advanced Discovery (Browse):** Real-time client/server side pagination (6–12 items/page), multi-tier filtering (genre, price-range, availability), text search, and multi-parameter sorting.
* **Fluid UX & Modern Design:** * Immersive layout optimized against chaotic visual patterns (*"Gobindo Design"* free zones).
    * Fully responsive UI (Mobile, Tablet, Desktop layouts).
    * Smooth text fade-ins and staggered element reveal via **Framer Motion**.
    * Global Dark Mode toggle using `next-themes` with persistent local state.

---

## 🎨 System Previews

| Feature | Desktop Mockup |
| :--- | :--- |
| **Marketplace (Browse)** | *[Skeleton loaders active on initial load / Infinite Grid]* |
| **Data Visualization** | *[Dynamic charts detailing monthly revenue & genre distribution]* |

---

## 💻 Tech Stack & Dependencies

### Frontend (`fable-client`)
* **Framework:** Next.js / React.js
* **Styling:** Tailwind CSS (Fluid spacing, accessible contrast ratios)
* **State & Auth:** JWT Context / BetterAuth (Google OAuth)
* **Animation:** Framer Motion
* **Theme Management:** `next-themes` (Dark/Light mode persistence)
* **Data Handling:** Axios / React Query

### Backend & Storage (`fable-server`)
* **Runtime:** Node.js with Express.js
* **Database:** MongoDB via Mongoose
* **Payment Gateway:** Stripe API
* **Image Hosting:** ImgBB API Integration

---

## ⚙️ Local Environment Setup

To run this project locally, clone the repository and configure your environment variables:

### 1. Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed.

### 2. Configuration (`.env.local`)
Create a `.env.local` file in your root folder and supply the following infrastructure keys:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
# BetterAuth / OAuth Configurations
BETTER_AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret