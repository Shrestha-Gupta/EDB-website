import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface TestimonialCardProps {
  image?: string;
  imageTitle?: string;
  imageSubtitle?: string;
  quote: string;
  organizationName: string;
  personName: string;
  personTitle: string;
  personAvatar?: string;
}

export default function TestimonialCard({
  image,
  imageTitle,
  imageSubtitle,
  quote,
  organizationName,
  personName,
  personTitle,
  personAvatar,
}: TestimonialCardProps) {
  return (
    <motion.div
      className="relative grid md:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-2xl max-w-6xl mx-auto bg-white items-stretch h-128 md:h-128"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: Image Section */}
      <motion.div
        className="relative h-128 md:h-128 overflow-hidden bg-orange-50"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {image ? (
          <img
            src={image}
            alt={imageTitle || "Testimonial"}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">EDB</div>
          </div>
        )}

        {/* Overlay Text */}
        {(imageTitle || imageSubtitle) && (
          <motion.div
            className="absolute left-0 right-0 bottom-0 p-6 md:p-8 bg-black/60 md:bg-black/25 backdrop-blur-none rounded-bl-3xl rounded-t-md rounded-br-3xl overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {/* subtle vertical gradient rising above the backdrop for legibility */}
            <div className="absolute -top-32 left-0 right-0 h-40 bg-linear-to-b from-black/20 to-transparent pointer-events-none md:from-transparent" />

            {imageTitle && (
              <motion.p
                className="text-xs text-white font-semibold tracking-wide uppercase mb-2 drop-shadow-lg"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.45 }}
              >
                {imageTitle}
              </motion.p>
            )}

            {imageSubtitle && (
              <motion.h3
                className="text-xl md:text-2xl font-extrabold leading-tight drop-shadow-lg"
                style={{ color: "rgba(255,255,255,0.90)" }}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.45 }}
              >
                {imageSubtitle}
              </motion.h3>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Right: Quote Section */}
      <motion.div
        className="relative bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 p-8 md:p-12 flex flex-col justify-between h-128"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Quote Mark */}
        <motion.div
          className="text-orange-400/40 text-8xl font-serif leading-none mb-4"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          "
        </motion.div>

        {/* Quote Text */}
        <motion.blockquote
          className="text-gray-800 text-lg md:text-xl font-light leading-relaxed mb-6 flex-1 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          {quote}
        </motion.blockquote>

        {/* Subtle fading gradient divider */}
        <div className="w-full h-1 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-orange-300/40 to-transparent animate-fadeGradient" />
        </div>

        {/* Author Info */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              {personAvatar ? (
                <img
                  src={personAvatar}
                  alt={personName}
                  className="w-full h-full object-cover"
                />
              ) : (
                personName.charAt(0)
              )}
            </div>

            {/* Name & Title */}
            <div>
              <div className="text-orange-600 font-bold text-sm tracking-wide uppercase">
                {organizationName}
              </div>
              <div className="text-gray-900 text-lg font-semibold">
                {personName}
              </div>
              <div className="text-gray-600 text-sm">{personTitle}</div>
            </div>
          </div>

          {/* Refresh Icon */}
          <motion.button
            className="p-3 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors"
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <RefreshCw className="w-5 h-5 text-orange-600" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
