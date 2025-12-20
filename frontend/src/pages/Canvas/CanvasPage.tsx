import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground";
import TestimonialCard from "../../components/Canvas/TestimonialCard";
import PageHero from "../../components/PageHero/PageHero";

export default function CanvasPage() {
  return (
    <div className="bg-brand-white min-h-screen pt-24 pb-20 px-6 relative">
      <ParticlesBackground />
      <motion.div
        className="max-w-5xl mx-auto"
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
          <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-brand-black mb-4">
            "The Editorial Board wasn't just a club—it was a movement that
            transformed students into storytellers, thinkers, and
            change-makers."
          </p>
          <p className="text-brand-orange font-bold">
            — Dr. Anil Verma, Founding Member (1995-1999)
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
            <TestimonialCard
              imageTitle=""
              imageSubtitle="Where creativity meets journalism"
              image="https://res.cloudinary.com/dml0jlwlv/image/upload/v1765646717/1000071523_-_Anurag_Banerjee_vsb06m.jpg"
              quote="The Editorial Board transformed my perspective on storytelling. It wasn't just about writing articles—it was about understanding the power of words to create change, inspire action, and build communities. Every meeting felt like a masterclass in creative thinking."
              organizationName="The Editorial Board"
              personName="Priya Sharma"
              personTitle="Alumni, Batch of 2019 • Content Strategist"
            />

            <TestimonialCard
              imageTitle="CREATIVE EXCELLENCE"
              imageSubtitle="Shaping tomorrow's thought leaders"
              image="https://picsum.photos/seed/rajesh/1200/800"
              quote="Being part of EDB taught me that journalism is an art form. The mentorship I received here didn't just improve my writing—it shaped my entire approach to communication. The skills and confidence I gained continue to serve me in every professional endeavor."
              organizationName="The Editorial Board"
              personName="Rajesh Kumar"
              personTitle="Former Editor • Digital Media Consultant"
            />

            <TestimonialCard
              imageTitle="COMMUNITY IMPACT"
              imageSubtitle="Stories that matter, voices that resonate"
              image="https://picsum.photos/seed/anjali/1200/800"
              quote="What sets EDB apart is its commitment to authentic storytelling. Here, I learned to listen deeply, ask meaningful questions, and craft narratives that truly matter. The friendships and professional network I built are invaluable assets in my career today."
              organizationName="The Editorial Board"
              personName="Anjali Verma"
              personTitle="Alumni, Batch of 2020 • Freelance Journalist"
            />

            <TestimonialCard
              imageTitle="STUDENT EXCELLENCE"
              imageSubtitle="Nurturing the next generation of writers"
              image="https://picsum.photos/seed/arjun/1200/800"
              quote="The Editorial Board gave me a platform to discover my voice and refine my craft. The collaborative environment pushed me to think critically and creatively. It's more than a publication—it's a family that believes in your potential and helps you achieve it."
              organizationName="The Editorial Board"
              personName="Arjun Malhotra"
              personTitle="Current Member, Batch of 2023 • Aspiring Author"
            />
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
