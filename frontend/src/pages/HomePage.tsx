import { motion } from "framer-motion";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Publications from "../components/Publications/Publications";
import Contact from "../components/Contact/Contact";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Hero />
      <About />
      <Publications />
      <Contact />
    </motion.div>
  );
}
