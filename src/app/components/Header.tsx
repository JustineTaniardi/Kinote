"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const HEADER_OFFSET = 80;
  const lastSection = useRef("home");

  // === scroll detection (tanpa mounted render ulang) ===
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section")
    ).filter((s) => ["home", "feature", "about"].includes(s.id));

    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);

      scrollTimeout = window.setTimeout(() => {
        const top = window.scrollY;
        let current = lastSection.current;
        for (const section of sections) {
          const offset = section.offsetTop - HEADER_OFFSET - 1;
          const height = section.offsetHeight;
          if (top >= offset && top < offset + height) {
            current = section.id;
            break;
          }
        }

        if (current !== lastSection.current) {
          lastSection.current = current;
          setActiveSection(current);
        }
      }, 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // === smooth scroll to section ===
  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveSection(id);
    window.scrollTo({
      top: target.offsetTop - HEADER_OFFSET,
      behavior: "smooth",
    });
  };

  // === Render Header ===
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        {/* Logo */}
        <div className="flex items-center h-full">
          <Image
            src="/img/landing-page/header_logo_kinote.png"
            alt="Kinote Logo"
            width={130}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex bg-white  px-10 py-3 gap-24 items-center  ">
          {[
            { id: "home", label: "Home" },
            { id: "feature", label: "Feature" },
            { id: "about", label: "About Us" },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => handleScrollTo(nav.id)}
              className="relative text-gray-700 hover:text-gray-900 font-medium text-sm transition"
            >
              <span className="relative inline-block pb-[4px]">
                {nav.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-gray-900 rounded-full transition-[width,opacity] duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                    activeSection === nav.id
                      ? "w-full opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-2 h-full">
          <Link
            href="/login"
            className="px-4 py-2.5 bg-gray-900 text-white rounded-md shadow text-sm font-medium hover:bg-gray-800 transition h-10 flex items-center justify-center"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100 text-sm font-medium transition h-10 flex items-center justify-center"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
