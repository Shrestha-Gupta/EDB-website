import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Tag,
  Download,
  Eye,
  X,
} from "lucide-react";
import ParticlesBackground from "../../components/ParticlesBackground/ParticlesBackground.tsx";
import PDFViewer from "../../components/PDFViewer/PDFViewer.tsx";

type TabType = "all" | "newsletter" | "magazine";

const newsletters = [
  {
    id: 1,
    title: "TIRESIA - Volume 16, Issue 3",
    type: "NEWSLETTER",
    year: "2025",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.56_2_gjepmx.jpg",
    description:
      "The June Issue of TIRESIA brings you a collection of thought-provoking articles, creative pieces, and insights from our university community.",
    pages: 150,
    contributors: 35,
    downloadUrl:
      "https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue3.pdf",
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
    pages: 150,
    contributors: 32,
    downloadUrl:
      "https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%20%202.pdf",
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
    pages: 145,
    contributors: 30,
    downloadUrl:
      "https://ogclndqjxchntpvsnhkp.supabase.co/storage/v1/object/public/TheEDB/vol%2016%20issue%201.pdf",
  },
];

const magazines = [
  {
    id: 4,
    title: "Malvika - Annual Magazine 2024",
    type: "ANNUAL MAGAZINE",
    year: "2024",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_dhbora.jpg",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1otl11ABJgRuG6QPzY0h4wXKWibV0wFkG/view?usp=drive_link",
  },
  {
    id: 5,
    title: "Malvika - Annual Magazine 2023",
    type: "ANNUAL MAGAZINE",
    year: "2023",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765572664/WhatsApp_Image_2025-12-12_at_22.44.43_1_soyehf.jpg",
    description:
      "A vibrant exploration of culture, arts, and heritage. Featuring stunning visual essays and interviews.",
    pages: 220,
    contributors: 42,
    downloadUrl:
      "https://drive.google.com/file/d/1ujW5ayrxj7mRdFZbabfg7Fs2nIrOpkdB/view?usp=drive_link",
  },
  {
    id: 6,
    title: "Malvika - Annual Magazine 2024",
    type: "ANNUAL MAGAZINE",
    year: "2024",
    coverImage:
      "https://res.cloudinary.com/dml0jlwlv/image/upload/v1765945632/Screenshot_2025-12-17_at_2.06.20_AM_aerfwl.png",
    description:
      "Our flagship annual publication featuring the finest poetry, prose, and essays from students and faculty.",
    pages: 240,
    contributors: 45,
    downloadUrl:
      "https://drive.google.com/file/d/1Y3eH_YFvmsAPgL9YAKjMCEzS3VuCk_M1/view?usp=drive_link",
  }
];

const allPublications = [...newsletters, ...magazines];

export default function PublicationsPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentLatestIndex, setCurrentLatestIndex] = useState(0);

  const getPublications = () => {
    switch (activeTab) {
      case "newsletter":
        return newsletters;
      case "magazine":
        return magazines;
      default:
        return allPublications;
    }
  };

  const publications = getPublications();
  const latestIssue = newsletters[currentLatestIndex];

  const handlePrevLatest = () => {
    setCurrentLatestIndex((prev) =>
      prev === 0 ? newsletters.length - 1 : prev - 1
    );
  };

  const handleNextLatest = () => {
    setCurrentLatestIndex((prev) =>
      prev === newsletters.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Particles (Pointer events none so you can click buttons) */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
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
          <h1 className="text-6xl md:text-7xl font-serif font-bold bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
            Publications
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover our collection of literary works, journals, and
            anthologies.
          </p>
        </motion.div>

        {/* Latest Issue Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="inline-block bg-orange-50 border-2 border-orange-500 text-orange-700 px-6 py-2.5 rounded-xl font-bold text-lg tracking-wider shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(249, 115, 22, 0)",
                  "0 0 15px rgba(249, 115, 22, 0.3)",
                  "0 0 0px rgba(249, 115, 22, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LATEST ISSUE
            </motion.div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Arrows */}
            <button
              onClick={handlePrevLatest}
              className="absolute -left-4 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-3 rounded-full shadow-xl hover:bg-orange-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextLatest}
              className="absolute -right-4 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-orange-500 text-white p-3 rounded-full shadow-xl hover:bg-orange-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLatestIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-8 p-8"
                >
                  {/* Left: Image */}
                  <div className="relative h-100 md:h-auto">
                    <img
                      src={latestIssue.coverImage}
                      alt={latestIssue.title}
                      className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Right: Info */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-gray-900">
                      {latestIssue.title}
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {latestIssue.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Published By
                          </p>
                          <p className="font-semibold text-gray-800">
                            The Editorial Board
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Release Date
                          </p>
                          <p className="font-semibold text-gray-800">
                            May 2024
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-xs text-gray-400 uppercase">
                            Category
                          </p>
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                            Magazine
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPdf(latestIssue.downloadUrl);
                        setSelectedTitle(latestIssue.title);
                      }}
                      className="w-full bg-orange-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                      View Full Issue
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {newsletters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLatestIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentLatestIndex === index
                      ? "bg-orange-500 w-8"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Buttons (FIXED VISIBILITY) */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab("all")}
            className={`cursor-pointer px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
              activeTab === "all"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("newsletter")}
            className={`cursor-pointer px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
              activeTab === "newsletter"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            Newsletter
          </button>
          <button
            onClick={() => setActiveTab("magazine")}
            className={`cursor-pointer px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 ${
              activeTab === "magazine"
                ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500"
            }`}
          >
            Annual Magazine
          </button>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence>
            {publications.map((pub) => (
              <motion.div
                key={pub.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="h-64 relative overflow-hidden shrink-0">
                    <img
                      src={pub.coverImage}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">
                      {pub.type === "ANNUAL MAGAZINE"
                        ? "Magazine"
                        : "Newsletter"}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedPdf(pub.downloadUrl);
                          setSelectedTitle(pub.title);
                        }}
                        className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <a
                        href={pub.downloadUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 grow">
                      {pub.description}
                    </p>
                    <div className="pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400 font-medium">
                      <span>{pub.year}</span>
                      <span>{pub.pages} Pages</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* PDF Viewer */}
        {selectedPdf && (
          <PDFViewer
            pdfUrl={selectedPdf}
            onClose={() => {
              setSelectedPdf(null);
              setSelectedTitle("");
            }}
            title={selectedTitle}
          />
        )}
      </motion.div>
    </div>
  );
}
