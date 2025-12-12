import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'TEAM', path: '/team' },
    { name: 'EVENTS', path: '/events' },
    { name: 'PUBLICATIONS', path: '/publications' },
    { name: 'ALUMNI', path: '/alumni' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CANVAS', path: '/canvas' },
    { name: 'CONTACT', path: '/contact' }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-brand-white/95 backdrop-blur-md border-b-4 border-brand-gold shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
              alt="The Editorial Board Logo"
              className="w-12 h-12 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.4 }}
            />
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent group-hover:from-brand-orange group-hover:to-brand-gold transition-all duration-300">
              The Editorial Board
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative"
              >
                <motion.span
                  className={`text-brand-black font-medium hover:text-brand-scarlet transition-colors duration-200 ${
                    isActive(link.path) ? 'text-brand-scarlet' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.span>
                {isActive(link.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-scarlet"
                    layoutId="navbar-indicator"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-brand-black hover:text-brand-scarlet transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="lg:hidden mt-4 flex flex-col gap-4 border-t-2 border-brand-gold pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-brand-black hover:text-brand-scarlet transition-colors ${
                  isActive(link.path) ? 'text-brand-scarlet font-bold' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
