"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";
import UserDropDown from "./UserDropDown";
import { authClient } from "@/app/lib/auth-client";

const navLinks = [
  { label: "Browse", href: "/books" },
  { label: "Writers", href: "/writers" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()

  const user = session?.user

  console.log(user);

  return (
    <nav className="z-50 bg-paper border-b-3 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-sun" strokeWidth={2.5} />
            <span className="text-2xl font-bold tracking-tight">Fable</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-sun transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {
            user ? <UserDropDown user={user}></UserDropDown> :
              <>
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login" className="btn-ghost text-sm py-2 px-4">
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-primary text-sm py-2 px-4">
                    Get Started
                  </Link>
                </div>
              </>
          }

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t-3 border-ink bg-paper">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm font-medium hover:text-sun transition-colors duration-200 py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-ink/20 flex flex-col gap-2">
              <a href="/login" className="btn-ghost text-sm py-2 px-4 text-center">
                Sign In
              </a>
              <a href="/signup" className="btn-primary text-sm py-2 px-4 text-center justify-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
