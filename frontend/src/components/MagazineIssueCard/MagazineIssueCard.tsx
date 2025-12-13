import { motion } from 'framer-motion'
import { Download, Users, Calendar, Tag } from 'lucide-react'

// TypeScript interface for component props
export interface MagazineIssueCardProps {
  coverImage: string
  title: string
  subtitle: string
  description: string
  publishedBy: string
  releaseDate: string
  category: string
  downloadUrl: string
}

export default function MagazineIssueCard({
  coverImage,
  title,
  subtitle,
  description,
  publishedBy,
  releaseDate,
  category,
  downloadUrl
}: MagazineIssueCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Left Column - Magazine Cover */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-sm">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-start"
        >
          {/* Latest Issue Badge */}
          <div className="inline-flex items-center gap-2 mb-6 w-fit">
            <div className="bg-[#FFE4E1] px-4 py-1.5 rounded-full">
              <span className="text-[#D91B1B] font-bold text-xs tracking-wider">
                LATEST ISSUE
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-black mb-2">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-brand-black italic mb-6">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-brand-black/70 leading-relaxed mb-8">
            {description}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Metadata List */}
          <div className="space-y-5 mb-10">
            {/* Published By */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Users className="w-6 h-6 text-[#D91B1B]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-black/60 tracking-wider uppercase mb-1">
                  Published By
                </p>
                <p className="text-base font-semibold text-brand-black">
                  {publishedBy}
                </p>
              </div>
            </div>

            {/* Release Date */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Calendar className="w-6 h-6 text-[#D91B1B]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-black/60 tracking-wider uppercase mb-1">
                  Release Date
                </p>
                <p className="text-base font-semibold text-brand-black">
                  {releaseDate}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Tag className="w-6 h-6 text-[#D91B1B]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-black/60 tracking-wider uppercase mb-2">
                  Category
                </p>
                <div className="inline-block">
                  <span className="bg-[#FFD700] text-brand-black font-bold text-sm px-5 py-1.5 rounded-full">
                    {category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <motion.a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-[#FF8C42] to-[#D91B1B] hover:from-[#ff7a2e] hover:to-[#c41818] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 w-full md:w-auto text-lg"
          >
            <Download className="w-6 h-6" strokeWidth={2} />
            <span>Download Full Issue</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
