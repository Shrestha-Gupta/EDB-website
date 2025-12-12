import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-black text-brand-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="text-xl font-serif font-bold mb-4">The Editorial Board</h4>
            <p className="text-brand-white/70 text-sm">
              A literary journal celebrating creativity, culture, and scholarly discourse at MMMUT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-brand-white/70 hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link to="/team" className="text-brand-white/70 hover:text-brand-gold transition-colors">Team</Link></li>
              <li><Link to="/events" className="text-brand-white/70 hover:text-brand-gold transition-colors">Events</Link></li>
              <li><Link to="/publications" className="text-brand-white/70 hover:text-brand-gold transition-colors">Publications</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-bold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/alumni" className="text-brand-white/70 hover:text-brand-gold transition-colors">Alumni</Link></li>
              <li><Link to="/gallery" className="text-brand-white/70 hover:text-brand-gold transition-colors">Gallery</Link></li>
              <li><Link to="/canvas" className="text-brand-white/70 hover:text-brand-gold transition-colors">Canvas</Link></li>
              <li><Link to="/contact" className="text-brand-white/70 hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-brand-red hover:bg-brand-orange transition-all rounded-full flex items-center justify-center text-sm font-bold shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                F
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-brand-cyan hover:bg-brand-teal transition-all rounded-full flex items-center justify-center text-sm font-bold shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                T
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-brand-gold hover:bg-brand-yellow transition-all rounded-full flex items-center justify-center text-sm font-bold text-brand-black shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                I
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-white/60 text-sm">
            © {currentYear} The Editorial Board, MMMUT. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm mt-4 md:mt-0">
            <a href="#" className="text-brand-white/60 hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-brand-white/60 hover:text-brand-gold transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
