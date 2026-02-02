import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { prefetchRoute } from "../../utils/prefetchRoutes";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    {
      name: "HOME",
      path: "/",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "TEAM",
      path: "/team",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "EVENTS",
      path: "/events",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "PUBLICATIONS",
      path: "/publications",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      name: "ALUMNI",
      path: "/alumni",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      name: "GALLERY",
      path: "/gallery",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "CANVAS",
      path: "/canvas",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      name: "ARUNODAY",
      path: "/arunoday-live",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      ),
    },
    {
      name: "MUN",
      path: "/mun",
      icon: (
        <svg
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    // Contact moved to separate button
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          {/* Left: Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-0 group shrink-0 z-10">
            <motion.img
              src="https://res.cloudinary.com/dzqtx9kms/image/upload/v1767477184/The_Editorial_Board_Logo..1.0_qrha0w.png"
              alt="The Editorial Board"
              loading="lazy"
              width={120}
              height={40}
              className="h-8 sm:h-9 md:h-10 lg:h-10 object-contain"
              style={{ backgroundImage: "none", backgroundColor: "transparent" }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
            />
            <motion.img
              src="https://res.cloudinary.com/dzqtx9kms/image/upload/v1766165427/alba_tq7bj1_kgsv3r.png"
              alt="The Editorial Board"
              className="h-4 sm:h-6 md:h-7 lg:h-8 object-contain mix-blend-normal -ml-5 sm:-ml-7 md:-ml-8"
              style={{ backgroundColor: "transparent" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Middle: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center px-4">
            {navLinks.slice(0, 10).map((link) => (
              <Link key={link.name} to={link.path} onMouseEnter={() => prefetchRoute(link.path)} onFocus={() => prefetchRoute(link.path)}>
                <motion.div
                  className={`relative px-2 xl:px-3 py-2 rounded-md font-medium text-xs xl:text-sm tracking-wide transition-all duration-300 overflow-hidden group ${isActive(link.path) ? "text-orange-500" : "text-gray-700"
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Before pseudo-element (top and bottom borders) */}
                  <motion.div
                    className="absolute inset-0 border-t border-b border-orange-500/50 opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0.1 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="relative z-10 uppercase tracking-wide xl:tracking-wider text-xs inline-block group-hover:text-orange-500"
                    initial={{ letterSpacing: "0.05em" }}
                    whileHover={{ letterSpacing: "0.1em" }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.name}
                  </motion.span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right: Contact Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link to="/contact">
              <motion.div
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full border-2 border-amber-500 bg-white font-medium text-sm overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                style={{
                  ['--mouse-x' as any]: '50%',
                  ['--mouse-y' as any]: '50%',
                }}
              >
                {/* Cursor-following spotlight with defined boundary */}
                <div
                  className="absolute w-20 h-20 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    left: 'var(--mouse-x)',
                    top: 'var(--mouse-y)',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, rgba(251, 191, 36, 0.3) 40%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />

                <svg
                  className="w-4 h-4 relative z-10 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>

                <span className="relative z-10 text-amber-600">
                  Contact Us
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 hover:text-orange-500 transition-colors p-2 -mr-2 z-10"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                style={{ top: '56px' }}
              />

              {/* Mobile menu panel */}
              <motion.div
                className="lg:hidden fixed left-0 right-0 bg-white/98 backdrop-blur-lg border-t border-gray-100 shadow-xl max-h-[calc(100vh-56px)] overflow-y-auto"
                style={{ top: '56px' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="px-4 py-4">
                  {/* Mobile nav links grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-200 ${isActive(link.path)
                            ? "text-orange-600 bg-orange-50 shadow-sm"
                            : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 active:bg-orange-100"
                            }`}
                        >
                          <span className="w-5 h-5 flex-shrink-0">
                            {link.icon}
                          </span>
                          <span className="text-sm font-medium truncate">
                            {link.name.charAt(0) + link.name.slice(1).toLowerCase()}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile CTA button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100 space-y-3"
                  >
                    {/* Auth Button for Mobile - DISABLED FOR PROD */}
                    {/* {isAuthenticated ? (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                      >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        Go to Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-200 active:scale-[0.98]"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Login / Sign Up
                      </Link>
                    )} */}

                    {/* Contact Button */}
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
