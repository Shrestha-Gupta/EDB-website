import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
}

export default function PageHero({ title, subtitle = "The Editorial Board", description }: PageHeroProps) {
  return (
    <motion.div className="text-center mb-16 space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest uppercase text-sm 2xl:text-base"
      >
        <span className="h-px w-12 2xl:w-16 bg-amber-700/40"></span>
        {subtitle}
        <span className="h-px w-12 2xl:w-16 bg-amber-700/40"></span>
      </motion.div>
      
      <h1 className="text-6xl md:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-serif font-bold text-stone-900 mb-6 drop-shadow-sm">
        {title}<span className="text-amber-600">.</span>
      </h1>
      
      {description && (
        <p className="text-xl md:text-2xl 2xl:text-3xl text-stone-600 font-serif italic max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
          "{description}"
        </p>
      )}
    </motion.div>
  )
}
