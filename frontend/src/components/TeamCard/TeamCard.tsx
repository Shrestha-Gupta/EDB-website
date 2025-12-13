import { motion } from 'framer-motion'
import { Linkedin, Github, Globe } from 'lucide-react'

interface TeamCardProps {
  name: string
  role: string
  department: string
  skills: string[]
  image?: string
  linkedin?: string
  github?: string
  website?: string
}

export default function TeamCard({
  name,
  role,
  department,
  skills,
  image,
  linkedin,
  github,
  website
}: TeamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-5 sm:p-6 flex flex-col items-center border border-brand-gold/20 overflow-hidden"
    >
      {/* Glassmorphism gradient overlay - golden warmth on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-gold/5 via-transparent to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Profile Image - deep black border, golden accent on hover */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-900 overflow-hidden mb-5 shadow-lg group-hover:border-brand-gold transition-colors duration-300">
        {image ? (
          <img src={image} alt={name} className="w-48 h-48 object-cover" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-bold text-gray-400">{name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Name - deep authoritative black */}
      <h3 className="relative z-10 text-lg sm:text-xl font-serif font-bold text-black mb-2 text-center tracking-tight leading-tight">
        {name}
      </h3>

      {/* Role - warm golden-orange for prestige */}
      

      {/* Department - scholarly gray */}
      <p className="relative z-10 text-sm sm:text-base text-gray-600 mb-4 text-center font-light leading-relaxed">
        {department}
      </p>

      {/* Skills/Tags - subtle with golden-orange hover */}
      

      {/* Social Links - scholarly blue/cyan with red only on hover for emphasis */}
      
    </motion.div>
  )
}
