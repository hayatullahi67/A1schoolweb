// Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/A1logo.png"
                alt="Logo"
                width={200}
                height={200}
              />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
            {/* Hamburger button: visible only on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar for Mobile Navigation */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
          {/* Sidebar panel */}
          <div className="relative ml-auto w-64 bg-background p-4 shadow-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mb-4"
            >
              <X className="h-6 w-6" />
            </Button>
            <nav className="flex flex-col gap-4">
              <Link href="/register" onClick={toggleSidebar}>
                Courses
              </Link>
              <Link href="/about" onClick={toggleSidebar}>
                About
              </Link>
              
              <Link href="/contact" onClick={toggleSidebar}>
                Contact
              </Link>
              <Link href="/login" onClick={toggleSidebar}>
                Log in
              </Link>
              <Link href="/register" onClick={toggleSidebar}>
                Sign up
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
