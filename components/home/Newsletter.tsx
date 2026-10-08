"use client";

import { useState } from "react";

// ============================================
// COCAVYN - Newsletter Section
// Homepage-এ email subscribe form
// NOTE: Real subscription in Stage 17 (CMS)
// ============================================

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Stage 17 - Real subscription to database
    setSubmitted(true);
    setEmail("");

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="relative bg-cocoa-dark py-16 md:py-20 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="text-5xl md:text-6xl mb-6">🍫</div>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-gold mb-4">
            Stay Sweet
          </h2>

          {/* Subtitle */}
          <p className="text-cream/80 text-lg mb-8 max-w-lg mx-auto">
            Be the first to know about new chocolate, special offers, and
            exclusive discounts.

          </p>

          {/* Form */}
          {submitted ? (
            <div className="bg-success/20 border border-success/30 rounded-xl px-6 py-4 inline-flex items-center gap-3">
              <CheckCircleIcon />
              <span className="text-cream font-medium">
                Thank you! You have successfully subscribed. 🎉
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-lg bg-white text-cocoa-dark placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-gold border-0"
              />
              <button
                type="submit"
                className="bg-gold text-cocoa-dark px-8 py-3.5 rounded-lg font-medium hover:bg-gold-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-cream/60 text-sm mt-6">
            We don't spam — just good chocolate 🍫
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Icons
// ============================================

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-success shrink-0"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}