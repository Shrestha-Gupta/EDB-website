import { motion } from 'framer-motion'
import { Download, User, Calendar, Tag } from 'lucide-react'

interface MagazineDetailCardProps {
  title: string
  subtitle: string
  description: string
  coverImage: string
  publishedBy: string
  releaseDate: string
  category: string
  downloadUrl: string
  onPreview?: () => void
}

export default function MagazineDetailCard({
  title,
  subtitle,
  description,
  coverImage,
  publishedBy,
  releaseDate,
  category,
  downloadUrl,
  onPreview
}: MagazineDetailCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
        {/* Left Column - Magazine Cover */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative group">
            <motion.img
              src={coverImage}
              alt={title}
              className="w-full max-w-md rounded-lg shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            {/* Optional Preview Button on Hover */}
            {onPreview && (
              <motion.button
                onClick={onPreview}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg"
                whileHover={{ scale: 1 }}
              >
                <span className="bg-white text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Right Column - Magazine Details */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Latest Issue Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-red-50 text-red-500 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase">
              Latest Issue
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-serif font-bold text-brand-black mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 italic mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-gray-700 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {description}
          </motion.p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Metadata */}
          <motion.div
            className="space-y-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Published By */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                  Published By
                </p>
                <p className="text-base font-medium text-brand-black">{publishedBy}</p>
              </div>
            </div>

            {/* Release Date */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                  Release Date
                </p>
                <p className="text-base font-medium text-brand-black">{releaseDate}</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Tag className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                  Category
                </p>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold">
                  {category}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Download Button */}
          <motion.a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-6 h-6" />
            Download Full Issue
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
