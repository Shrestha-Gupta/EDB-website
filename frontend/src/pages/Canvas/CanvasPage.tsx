import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import TestimonialCard from "../../components/Canvas/TestimonialCard";
import PageHero from "../../components/PageHero/PageHero";
import canvasData from "../../data/canvasData.json";
import SEO, { seoConfigs } from "../../components/SEO/SEO";

export default function CanvasPage() {
  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 2xl:px-12 relative overflow-x-hidden font-sans text-stone-800">
      <SEO {...seoConfigs.canvas} />
      <ParticlesBackground />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-[radial-gradient(closest-side,rgba(251,191,36,0.15),transparent)] pointer-events-none translate-z-0" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-[radial-gradient(closest-side,rgba(253,186,116,0.15),transparent)] pointer-events-none translate-z-0" />
      <motion.div
        className="max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        {/* Header */}
        <PageHero 
          title="Canvas" 
          subtitle="Reflections"
          description="A space for alumni and board members to share their experiences, reflections, and wisdom with the community."
        />

        {/* Featured Quote */}
        <motion.div
          className="mb-16 bg-linear-to-br from-brand-gold/20 to-brand-orange/20 border-l-8 border-brand-gold p-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-serif italic text-brand-black mb-4">
            "We are all apprentices in a craft where no one ever becomes a master."
          </p>
          <p className="text-brand-orange font-bold">
            - Ernest Hemingway
          </p>
        </motion.div>

        {/* Featured Testimonials Section */}
        <div className="mb-20">
          <motion.h2
            className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Voices from Our Community
          </motion.h2>

          <div className="space-y-12">
            {canvasData.testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                imageTitle={testimonial.imageTitle}
                imageSubtitle={testimonial.imageSubtitle}
                image={testimonial.image}
                quote={testimonial.quote}
                organizationName={testimonial.organizationName}
                personName={testimonial.personName}
                personTitle={testimonial.personTitle}
                personAvatar={testimonial.personAvatar}
              />
            ))}
          </div>
        </div>

        {/* Stories Grid */}

        {/* Share Your Story CTA */}
        <motion.div
          className="bg-linear-to-br from-brand-red/10 to-brand-orange/10 border-4 border-brand-red p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-serif font-bold bg-linear-to-r from-brand-red to-brand-orange bg-clip-text text-transparent mb-6">
            Share Your Story
          </h2>
          <p className="text-xl text-brand-black/70 mb-8 max-w-2xl mx-auto">
            Your experiences can inspire current and future board members. Share
            your journey, lessons, and memories on Canvas.
          </p>
          <Link to="/contact" className="w-full sm:inline-block sm:w-auto">
            <motion.div
              className="w-full sm:w-auto bg-linear-to-r from-brand-red to-brand-red text-black font-bold py-4 px-12 text-lg rounded-3xl cursor-pointer inline-block text-center md:hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WRITE YOUR STORY
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
