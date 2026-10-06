"use client";

import Link from "next/link";
import { useState } from "react";


// ============================================
// COCAVYN - Main Header / Navbar
// Logo, Navigation, Search, Account, Cart
// ============================================

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="COCAVYN Home"
          >
            <span className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark tracking-wide">
              COCAVYN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/best-sellers">Best Sellers</NavLink>
            <NavLink href="/gifts">Gifts</NavLink>
            <NavLink href="/offers">Offers</NavLink>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <button
              className="p-2 text-cocoa-dark hover:text-gold transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-cocoa-dark hover:text-gold transition-colors"
              aria-label="Account"
            >
              <UserIcon />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-cocoa-dark hover:text-gold transition-colors"
              aria-label="Cart"
            >
              <CartIcon />
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-cocoa-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-cocoa-dark hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-cocoa/10 py-4 flex flex-col gap-3">
            <NavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink href="/shop" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </NavLink>
            <NavLink
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </NavLink>
            <NavLink
              href="/best-sellers"
              onClick={() => setMobileMenuOpen(false)}
            >
              Best Sellers
            </NavLink>
            <NavLink href="/gifts" onClick={() => setMobileMenuOpen(false)}>
              Gifts
            </NavLink>
            <NavLink href="/offers" onClick={() => setMobileMenuOpen(false)}>
              Offers
            </NavLink>
            <NavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </NavLink>
            <NavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

// ============================================
// Nav Link Component
// ============================================

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-cocoa-dark font-medium hover:text-gold transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

// ============================================
// Icons
// ============================================

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}