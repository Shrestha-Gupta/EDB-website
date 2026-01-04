import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Calendar, ArrowRight, Eye, Download } from "lucide-react";
import PDFViewer from "../PDFViewer/PDFViewer";

const publications = [
  {
    id: 1,
    title: "TIRESIA - Volume 17, Issue 1",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1767423428/Screenshot_2026-01-03_at_12.21.54_PM_vfrzi5.png",
    description:
      "The November Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
    pages: 150,
    contributors: 35,
    downloadUrl:
      "https://drive.google.com/file/d/1oZDIzwdc4LG8jU6UV3NCG4NRC21RvheB/view?usp=drive_link",
  },
  {
    id: 2,
    title: "TIRESIA - Volume 16, Issue 3",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_2_gjepmx.jpg",
    description:
      "The June Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
    downloadUrl:
      "https://drive.google.com/file/d/1zVre8DDBha64ZGsHTC7TkfMCT3nRqWm6/view?usp=drive_link",
  },
  {
    id: 3,
    title: "TIRESIA - Volume 16, Issue 2",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_1_wzbldy.jpg",
    description:
      "The May Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
    downloadUrl:
      "https://drive.google.com/file/d/122oPKlmRyZJibPxUAig4UzrbfFrDe3eP/view?usp=drive_link",
  },
];

export default function Publications() {
  const [selectedPdf, setSelectedPdf] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <section className="my-12 px-6 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-orange-500" />
            <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">
              Our Works
            </span>
            <span className="h-px w-8 bg-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Latest <span className="text-orange-600">Publications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Exploring ideas, stories, and creativity through our student-led
            journals and magazines.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <motion.img
                  src={pub.coverImage}
                  alt={pub.title}
                  className="w-full h-full object-cover origin-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-4 transform translate-y-4 group-hover:translate-y-0 active:translate-y-0 motion-reduce:transition-none">
                  <motion.button
                    onClick={() =>
                      setSelectedPdf({ url: pub.downloadUrl, title: pub.title })
                    }
                    className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-orange-50 transition-colors transform hover:scale-105 active:scale-95 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" /> Preview
                  </motion.button>

                  <motion.a
                    href={pub.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-orange-700 hover:text-white! transition-colors transform hover:scale-105 active:scale-95 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" /> Download
                  </motion.a>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-md">
                  {pub.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-orange-500" />
                    {pub.year}
                  </div>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-orange-500" />
                    Latest Issue
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {pub.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {pub.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setSelectedPdf({ url: pub.downloadUrl, title: pub.title })
                    }
                    className="text-orange-600 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/publications">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-colors shadow-xl hover:shadow-orange-600/20 group cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Full Archive
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedPdf && (
            <div className="relative z-50">
              <PDFViewer
                pdfUrl={selectedPdf.url}
                title={selectedPdf.title}
                onClose={() => setSelectedPdf(null)}
              />
            </div>
        )}
      </AnimatePresence>
    </section>
  );
}
