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

interface HomePageProps {
  onOpenRegistration?: () => void;
}

export default function HomePage({ onOpenRegistration }: HomePageProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Hero onOpenRegistration={onOpenRegistration} />
      <About />
      <Publications />
      <Contact />
    </motion.div>
  );
}
