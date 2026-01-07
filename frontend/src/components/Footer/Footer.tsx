import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 text-gray-900 overflow-hidden">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Logo + Tagline */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full lg:w-auto">
            <motion.img
              src="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png"
              alt="The Editorial Board"
              loading="lazy"
              width={160}
              height={80}
              className="h-14 sm:h-16 md:h-20 object-contain"
              style={{ backgroundImage: "none", backgroundColor: "transparent" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex-1">
              <motion.img
                src="https://res.cloudinary.com/dzqtx9kms/image/upload/v1766165427/alba_tq7bj1_kgsv3r.png"
                alt="The Editorial Board"
                className="h-6 sm:h-8 md:h-10 object-contain"
                style={{ backgroundColor: "transparent" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />
              <motion.p
                className="text-gray-700 mt-2 sm:mt-3 lg:mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                The Editorial Board (publication) and MMMUT community (network)
                work together seamlessly to create a platform for storytelling,
                creativity, and scholarly discourse.
              </motion.p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:block shrink-0"
          >
            <Link to="/publications">
              <motion.div
                role="button"
                className="bg-linear-to-r from-brand-red to-brand-red text-black font-bold py-3 px-8 lg:py-4 lg:px-12 text-base lg:text-lg rounded-3xl cursor-pointer inline-block text-center hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-flex items-center gap-2">
                  Our Publications
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Large Bold Statement */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-none bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
            Beckoning
            <br />
            creati'wit'y
          </h2>
        </motion.div>

        {/* Mobile CTA: show after big statement only on small screens */}
        <div className="lg:hidden mt-4">
          <Link to="/publications" className="inline-block">
            <motion.div
              role="button"
              className="bg-transparent text-brand-red font-bold py-3 pr-6 text-base rounded-3xl cursor-pointer inline-block text-center hover:bg-brand-red hover:text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="inline-flex items-center gap-2">
                Our Publications
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Links Grid */}
      <div className="border-t border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-orange-600">
                Quick Links
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/publications"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Publications
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-orange-600">
                Community
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm">
                <li>
                  <Link
                    to="/alumni"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Alumni
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/canvas"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Canvas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-orange-600">About</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                A literary journal celebrating creativity, culture, and
                scholarly discourse at MMMUT.
              </p>
            </div>

            {/* Social Links */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-orange-600">
                Follow Us
              </h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/edboard.mmmut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-500 transition-all text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/the_editorial_board/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-500 transition-all text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-orange-200 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-700 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} The Editorial Board, MMMUT. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
