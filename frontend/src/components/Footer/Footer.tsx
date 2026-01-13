import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 text-gray-900 overflow-hidden">
      {/* Main Hero Section */}
      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12 lg:py-16">
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
                loading="eager"
                className="h-6 sm:h-8 md:h-10 object-contain brightness-0"
                style={{ backgroundColor: "transparent" }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
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
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] 3xl:text-[12rem] font-black uppercase leading-none bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
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
        <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-10 lg:py-12">
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
              <div className="flex flex-wrap gap-3 sm:gap-4">
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
                <a
                  href="https://www.linkedin.com/company/theeditorialboard/"
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
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="https://whatsapp.com/channel/0029VamUHA1LNSZzy9QRLG2r"
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
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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
