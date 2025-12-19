import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Calendar, ArrowRight } from "lucide-react";

const publications = [
  {
    id: 1,
    title: "TIRESIA - Volume 16, Issue 3",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_2_gjepmx.jpg",
    description:
      "The June Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
  },
  {
    id: 2,
    title: "TIRESIA - Volume 16, Issue 2",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_1_wzbldy.jpg",
    description:
      "The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
  },
  {
    id: 3,
    title: "TIRESIA - Volume 16, Issue 1",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_ffabep.jpg",
    description:
      "A celebration of diverse voices and perspectives. This edition features student poetry, faculty essays, and multimedia content.",
  },
];

export default function Publications() {
  return (
    <section className="py-20 px-6 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Publications
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover our latest newsletters, magazines, and creative works
          </motion.p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md md:shadow-lg md:hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              {/* Cover Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={pub.coverImage}
                  srcSet={`${pub.coverImage.replace(
                    "/upload/",
                    "/upload/w_600/"
                  )} 600w, ${pub.coverImage.replace(
                    "/upload/",
                    "/upload/w_900/"
                  )} 900w, ${pub.coverImage} 1200w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  alt={pub.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2 + 0.3,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  {pub.type}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-3 text-sm text-gray-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.4 }}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{pub.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>Newsletter</span>
                  </div>
                </motion.div>

                <motion.h3
                  className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6, duration: 0.4 }}
                >
                  {pub.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 text-sm line-clamp-3 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.7, duration: 0.4 }}
                >
                  {pub.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <Link to="/publications">
            <motion.div
              role="button"
              className="bg-transparent text-brand-red font-bold py-4 px-12 text-lg rounded-3xl cursor-pointer inline-block text-center border-2 border-transparent hover:border-brand-red hover:bg-linear-to-r hover:from-brand-red hover:to-brand-red hover:text-white shadow-lg transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(196, 30, 58, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <span className="inline-flex items-center gap-2">
                View All Publications
                <motion.div
                  animate={
                    typeof window !== "undefined" && window.innerWidth > 640
                      ? { x: [0, 5, 0] }
                      : undefined
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
