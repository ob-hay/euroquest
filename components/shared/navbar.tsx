"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ContactPopup from "@/components/popups/contact";
import { usePopupStore } from "@/store/popup-store";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { openContact } = usePopupStore();
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    return pathname === path;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/training-cities", label: "Training Cities" },
    { href: "/training-courses", label: "Training Categories" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 w-full h-[70px] bg-white flex items-center z-[100]">
        <div className="container mx-auto">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4 max-w-[280px] justify-between">
              <Link href="/">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="w-[160px] lg:w-[190px] lg:h-[50px]"
                />
              </Link>
            </div>

            <ul className="hidden lg:flex gap-6">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative group"
                >
                  <Link 
                    href={link.href} 
                    className={`text-[#314EA9] transition-colors duration-300 font-semibold text-[15px] relative ${
                      isActive(link.href) ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {link.label}
                    {/* Active indicator */}
                    <span 
                      className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[3px] bg-[#20b486] rounded-full transition-all duration-1000 ease-in-out ${
                        isActive(link.href) ? "w-8" : "w-0 group-hover:w-[10px]"
                      }`}
                    />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openContact()}
                  className="text-[#314EA9] transition-colors duration-300 font-semibold text-[15px]"
                  suppressHydrationWarning={true}
                >
                  Contact Us
                </button>
              </li>
            </ul>

            <div className="flex items-center gap-12 md:hidden">
              <button
                className="w-11 h-11 rounded-xl border-2 border-[#DDE9FF] flex items-center justify-center cursor-pointer bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] outline-none transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(49,78,169,0.1)] hover:shadow-lg"
                onClick={openSidebar}
              >
                <Menu className="w-5 h-5 font-semibold text-blue-600" />
              </button>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </nav>

      {/* New Modern Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={closeSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Main Sidebar Container */}
            <motion.div
              className="fixed top-0 right-0 w-80 h-screen bg-gradient-to-br from-white to-slate-50 shadow-2xl z-[9999] flex flex-col border-l border-blue-200/20 sm:w-80 max-[480px]:w-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.4,
              }}
            >
              {/* Sidebar Header */}
              <motion.div
                className="px-6 pt-5 pb-4 bg-gradient-to-br from-white to-slate-100 border-b border-blue-200/20 max-[480px]:px-4 max-[480px]:pt-4 max-[480px]:pb-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="Logo"
                    width={160}
                    height={50}
                    className="w-40 h-auto max-[480px]:w-36"
                  />
                  <motion.button
                    className="w-10 h-10 border-none rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-500/15 hover:scale-105"
                    onClick={closeSidebar}
                    aria-label="Close menu"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Navigation Content */}
              <motion.div
                className="flex-1 flex flex-col p-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <nav className="flex-1 py-6 overflow-y-auto">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      className="px-6 max-[480px]:px-4"
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="block w-full"
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center px-5 py-3 rounded-2xl no-underline font-medium text-base transition-all duration-300 relative ${
                            isActive(link.href)
                              ? "font-bold "
                              : ""
                          }`}
                          onClick={closeSidebar}
                        >
                          <span className={`font-medium text-[#3E5EC0] tracking-wide relative ${isActive(link.href) ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-[40px] after:h-[3px] after:bg-emerald-500 after:rounded-full" : ""}`}>
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                      {/* Separator Line */}
                      {index < navLinks.length - 1 && (
                        <div className="mx-5 my-2 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
                      )}
                    </motion.div>
                  ))}

                  {/* Separator before Contact */}
                  <div className="mx-6 my-4 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent max-[480px]:mx-4"></div>

                  {/* Contact Button */}
                  <motion.div
                    className="px-6 max-[480px]:px-4"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4 + navLinks.length * 0.1,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full"
                    >
                      <button
                        onClick={() => {
                          closeSidebar();
                          openContact();
                        }}
                        className="w-full px-5 py-3 text-start rounded-2xl text-[#3E5EC0] border-none font-semibold text-base cursor-pointer transition-all duration-300"
                        suppressHydrationWarning={true}
                      >
                        <span className="font-medium">
                          Contact Us
                        </span>
                      </button>
                    </motion.div>
                  </motion.div>

                  
                  {/* Language Button */}
                  <motion.div
                    className="px-6 max-[480px]:px-4 mt-8"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + navLinks.length * 0.1,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full"
                    >
                      <button
                        onClick={() => {
                          // TODO: Add language switching functionality
                          console.log('Language switch to Arabic');
                        }}
                        className="font-cairo w-full px-5 py-3 text-center rounded-2xl bg-blue-500/10 text-[#3E5EC0] font-bold text-base cursor-pointer transition-all duration-300 hover:shadow-lg"
                        suppressHydrationWarning={true}
                      >
                        <span className="font-medium">
                         الدورات العربية
                        </span>
                      </button>
                    </motion.div>
                  </motion.div>
                </nav>

                {/* Sidebar Footer */}
                <motion.div
                  className="p-6 bg-gradient-to-br from-slate-50 to-slate-200 border-t border-blue-200/20 max-[480px]:p-4 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <div className="text-center">
                    <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">
                      Professional Training & Development
                    </p>
                    <div className="text-slate-400 text-xs font-normal">
                      <span>All rights reserved. EUROQUEST INTERNATIONAL © 2026</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
