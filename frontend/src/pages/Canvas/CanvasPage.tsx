import { motion } from 'framer-motion'
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground'

const canvasStories = [
  {
    id: 1,
    author: 'Priya Sharma',
    batch: '2016-2020',
    title: 'My Journey from Campus to Publishing House',
    excerpt: 'The Editorial Board was where I discovered my passion for storytelling. The late-night editing sessions, passionate debates about literature, and the camaraderie shaped who I am today...',
    date: '2 weeks ago',
    likes: 124,
    color: 'brand-red'
  },
  {
    id: 2,
    author: 'Rajesh Kumar',
    batch: '2012-2016',
    title: 'Lessons in Leadership and Creativity',
    excerpt: 'Leading the editorial board taught me more than any classroom ever could. From managing deadlines to fostering creativity in others, these experiences became the foundation of my career in journalism...',
    date: '1 month ago',
    likes: 98,
    color: 'brand-orange'
  },
  {
    id: 3,
    author: 'Anjali Verma',
    batch: '2008-2012',
    title: 'The Power of Words and Community',
    excerpt: 'What started as a student organization became a lifelong community. The friendships, the mentorship, and the creative freedom we enjoyed continue to inspire my work in content strategy...',
    date: '3 months ago',
    likes: 156,
    color: 'brand-cyan'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
}

const storyVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}

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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-brand-cyan via-brand-teal to-brand-gold bg-clip-text text-transparent mb-6">
            Canvas
          </h1>
          <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
            A space for alumni and board members to share their experiences, reflections, and wisdom with the community.
          </p>
        </motion.div>

        {/* Featured Quote */}
        <motion.div
          className="mb-16 bg-linear-to-br from-brand-gold/20 to-brand-orange/20 border-l-8 border-brand-gold p-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-2xl md:text-3xl font-serif italic text-brand-black mb-4">
            "The Editorial Board wasn't just a club—it was a movement that transformed students into storytellers, thinkers, and change-makers."
          </p>
          <p className="text-brand-orange font-bold">— Dr. Anil Verma, Founding Member (1995-1999)</p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          className="space-y-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {canvasStories.map((story) => (
            <motion.article
              key={story.id}
              variants={storyVariants}
              className="group"
            >
              <div className="bg-brand-white border-4 border-brand-gold hover:border-brand-red transition-all duration-300 overflow-hidden shadow-lg">
                <div className="p-8">
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-${story.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {story.author.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-brand-black group-hover:text-brand-red transition-colors">
                          {story.author}
                        </h3>
                        <p className="text-brand-black/60">{story.batch}</p>
                      </div>
                    </div>
                    <span className="text-brand-black/50 text-sm">{story.date}</span>
                  </div>

                  {/* Story Content */}
                  <h2 className="text-3xl font-serif font-bold text-brand-black mb-4 group-hover:text-brand-red transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-lg text-brand-black/70 mb-6 leading-relaxed">
                    {story.excerpt}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-brand-gold/30">
                    <div className="flex gap-6 items-center">
                      <motion.button
                        className="flex items-center gap-2 text-brand-red hover:text-brand-red"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="font-semibold">{story.likes}</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center gap-2 text-brand-cyan hover:text-brand-teal"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="font-semibold">Comment</span>
                      </motion.button>
                    </div>
                    <motion.button
                      className="text-brand-black hover:text-brand-orange font-bold"
                      whileHover={{ x: 5 }}
                    >
                      Read More →
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
            Your experiences can inspire current and future board members. Share your journey, lessons, and memories on Canvas.
          </p>
          <motion.button
            className="bg-linear-to-r from-brand-red to-brand-red text-white font-bold py-4 px-12 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(196, 30, 58, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            WRITE YOUR STORY
          </motion.button>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          className="mt-12 bg-brand-cyan/10 border-4 border-brand-cyan p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl font-serif font-bold text-brand-cyan mb-4">
            Submission Guidelines
          </h3>
          <ul className="space-y-3 text-brand-black/70">
            <li className="flex items-start gap-3">
              <span className="text-brand-cyan font-bold text-xl">•</span>
              <span>Share authentic experiences from your time with The Editorial Board</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-cyan font-bold text-xl">•</span>
              <span>Stories should be 500-1500 words</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-cyan font-bold text-xl">•</span>
              <span>Focus on lessons learned, challenges overcome, or memorable moments</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-cyan font-bold text-xl">•</span>
              <span>All submissions are reviewed before publishing</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}
