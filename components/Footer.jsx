import Link from "next/link";
import { BookOpen, Twitter, Mail, MailIcon, BookOpenIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const footerLinks = {
  Platform: [
    { label: "Browse Ebooks", href: "/browse" },
    { label: "Top Writers", href: "/writers" },
    { label: "Genres", href: "/genres" },
    { label: "New Releases", href: "/new" },
  ],
  "For Writers": [
    { label: "Start Writing", href: "/signup" },
    { label: "Writer Guidelines", href: "/guidelines" },
    { label: "Pricing", href: "/pricing" },
    { label: "Success Stories", href: "/stories" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Community", href: "/community" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "DMCA", href: "/dmca" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t-3 border-ink bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpenIcon className="w-6 h-6 text-sun" strokeWidth={2.5} />
              <span className="text-xl font-bold">Fable</span>
            </Link>
            <p className="text-sm text-ink/60 leading-relaxed max-w-xs">
              A curated library for readers who care about quality and writers
              who share original stories.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink/60 hover:text-sun transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ink/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink/50">
            &copy; {new Date().getFullYear()} Fable. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-ink/40 hover:text-sun transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-ink/40 hover:text-sun transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-ink/40 hover:text-sun transition-colors duration-200"
              aria-label="Email"
            >
              <MailIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
