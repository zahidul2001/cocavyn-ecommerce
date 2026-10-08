"use client";

import Link from "next/link";
import { useState } from "react";

// ============================================
// COCAVYN - Contact Page
// Contact info + contact form
// ============================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Stage 17 - Real contact form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-10 md:py-14">
          <nav className="text-sm text-gray mb-4">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cocoa-dark">Contact</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cocoa-dark mb-4">
            Contact Us
          </h1>
          <p className="text-cocoa-light text-lg max-w-2xl">
            We would love to hear from you. Reach out for any questions,
            orders, or feedback.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div>
            <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-6">
              Let's Talk
            </h2>
            <p className="text-cocoa-light leading-relaxed mb-8">
              Whether you want to place an order, ask about our chocolate, or
              simply say hello — we are here for you. Reach out through any of
              the channels below.
            </p>

            <div className="space-y-5">
              {/* Phone */}
              <a
                href="tel:01852134062"
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-cocoa/5 hover:border-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-sm text-gray uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <p className="font-medium text-cocoa-dark">01852134062</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:cocavyn@gmail.com"
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-cocoa/5 hover:border-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-sm text-gray uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="font-medium text-cocoa-dark break-all">
                    cocavyn@gmail.com
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801852134062"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-cocoa/5 hover:border-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <WhatsAppIcon />
                </div>
                <div>
                  <p className="text-sm text-gray uppercase tracking-wider mb-1">
                    WhatsApp
                  </p>
                  <p className="font-medium text-cocoa-dark">
                    +880 1852-134062
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-cocoa/5">
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0">
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-sm text-gray uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="font-medium text-cocoa-dark">
                    Sylhet, Bangladesh
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-cocoa/5">
                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <p className="text-sm text-gray uppercase tracking-wider mb-1">
                    Business Hours
                  </p>
                  <p className="font-medium text-cocoa-dark">
                    Sat – Thu: 9:00 AM – 10:00 PM
                  </p>
                  <p className="text-sm text-gray">Friday: 2:00 PM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-cocoa/5">
              <h3 className="font-serif text-2xl font-bold text-cocoa-dark mb-6">
                Send a Message
              </h3>

              {submitted ? (
                <div className="bg-success/10 border border-success/30 rounded-xl px-6 py-6 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-cocoa-dark font-medium mb-1">
                    Thank you for your message!
                  </p>
                  <p className="text-gray text-sm">
                    We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-cocoa-dark mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-cocoa-dark mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-cocoa-dark mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-cocoa-dark mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-cocoa text-cream py-3.5 rounded-lg font-medium hover:bg-cocoa-dark transition-colors"
                  >
                    Send Message
                  </button>

                  <p className="text-xs text-gray text-center">
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-cocoa-dark"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}