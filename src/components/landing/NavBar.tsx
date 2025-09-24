/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Navbar1() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // scroll detection
  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { title: "Accueil", href: "#home" },
    { title: "À propos", href: "#about" },
    { title: "Comment ça marche", href: "#how-it-works" },
  ];
  const navLinks1 = [
    { title: "Accueil", href: "#home" },
    { title: "À propos", href: "#about" },
    { title: "Comment ça marche", href: "#how-it-works" },
    { title: "Contact", href: "#contact" },
  ];
  const headerVariants: Variants = {
    expanded: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 26 },
    },
    collapsed: {
      x: 320,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Floating round menu button */}
      <motion.button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 font-montserrat top-4 z-[60] rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400 text-white shadow-xl p-3"
        initial={{ opacity: 0, scale: 0.8, x: 60 }}
        animate={
          collapsed
            ? { opacity: 1, scale: 1, x: 0 }
            : { opacity: 0, scale: 0.8, x: 60 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </motion.button>

      {/* Main header */}
      <motion.nav
        variants={headerVariants}
        animate={collapsed ? "collapsed" : "expanded"}
        className="fixed top-3 font-montserrat left-1/2 -translate-x-1/2 rounded-full lg:px-4 px-2 z-40 border-b-2 border-t-gray-200 border-t border-[#f6ba13] bg-white/10 backdrop-blur-lg shadow w-11/12"
      >
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4 gap-12">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            <img
              src="/images/logov1white.png"
              alt="logo"
              className="lg:h-14 h-8 w-auto"
            />
          </Link>

          {/* Desktop nav (only visible when not collapsed) */}
          <div
            className={`hidden md:flex items-center gap-8 font-semibold ${
              collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-100 hover:text-white transition-colors relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link href="#contact" className="hidden md:flex items-center gap-2">
            <div className="text-white border-2 border-e-white font-semibold rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400 px-4 py-2">
              Prendre RDV
            </div>
            <div className="rounded-full border-2 border-e-white bg-gradient-to-r from-[#f6ba13] to-orange-400 text-white p-2">
              <Phone />
            </div>
          </Link>
          <div className="md:hidden flex items-center gap-4 z-50">
            {" "}
            <button
              className="text-white z-50"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {" "}
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />{" "}
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />{" "}
                </svg>
              )}{" "}
            </button>{" "}
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#f6ba13] to-orange-400 text-white space-y-8 md:hidden"
          >
            <button
              className="text-black z-50 absolute top-8 right-8"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {" "}
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />{" "}
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />{" "}
                </svg>
              )}{" "}
            </button>{" "}
            <div
              className="absolute w-full h-full top-0 bg-center z-40"
              style={{ backgroundImage: 'url("/images/Vector1.png")' }}
            />
            <div className="bg-white py-4 px-8 rounded-full z-50">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-white"
              >
                <img
                  src="/images/logov1.png"
                  alt=""
                  className="lg:h-20 h-8 w-auto"
                />
              </Link>
            </div>
            {navLinks1.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="z-50 relative"
              >
                <Link
                  href={`${item.href}`}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold hover:text-orange-500 transition-colors"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && collapsed && (
          <motion.div
            key="desktop-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex flex-col fixed top-20 right-4 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-72"
          >
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Link href="/" onClick={() => setOpen(false)}>
                <img
                  src="/images/logov1.png"
                  alt="logo"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Nav links */}
            <div className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400 text-white font-semibold py-2 px-4"
              >
                Prendre RDV <Phone className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
