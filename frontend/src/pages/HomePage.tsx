import { motion } from 'framer-motion'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Works from '../components/Works/Works'
import Team from '../components/Team/Team'
import Contact from '../components/Contact/Contact'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Hero />
      <About />
      <Works />
      <Team />
      <Contact />
    </motion.div>
  )
}
