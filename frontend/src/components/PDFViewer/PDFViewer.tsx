import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  onClose?: () => void;
  title?: string;
}

export default function PDFViewer({ pdfUrl, onClose, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [useGoogleViewer, setUseGoogleViewer] = useState<boolean>(false);

  // Check if it's a Google Drive link
  const isGoogleDrive = pdfUrl.includes("drive.google.com");

  // Convert Google Drive link to embeddable format
  const getEmbedUrl = (url: string) => {
    if (url.includes("drive.google.com")) {
      const fileId = url.match(/\/d\/([^/]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    // Fallback to Google Docs Viewer for other external URLs
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const embedUrl = getEmbedUrl(pdfUrl);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error: Error): void {
    console.warn("PDF Load Error, switching to Google Viewer:", error);
    setLoading(false);
    setUseGoogleViewer(true);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  // If it's a modal view (has onClose), render as modal
  if (onClose) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white shrink-0">
              <h3 className="text-lg font-semibold truncate">
                {title || "PDF Viewer"}
              </h3>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleOpenInNewTab}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-hidden bg-gray-100 min-h-0">
              {isGoogleDrive || useGoogleViewer ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  title={title || "PDF Viewer"}
                  allow="autoplay"
                />
              ) : (
                <div className="w-full h-full overflow-auto p-4 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="shadow-2xl rounded-lg overflow-hidden bg-white"
                  >
                    {loading && (
                      <div className="flex items-center justify-center h-96">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                      </div>
                    )}

                    <Document
                      file={pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className="flex items-center justify-center h-96">
                          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                        </div>
                      }
                    >
                      <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="max-w-full"
                      />
                    </Document>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Embedded view (original functionality)

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4 p-4 bg-white border-b border-gray-200 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <motion.button
            onClick={zoomOut}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom Out"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={resetZoom}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {Math.round(scale * 100)}%
          </motion.button>

          <motion.button
            onClick={zoomIn}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom In"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: pageNumber > 1 ? 1.05 : 1 }}
            whileTap={{ scale: pageNumber > 1 ? 0.95 : 1 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <span className="text-sm font-medium text-gray-700 min-w-25 text-center">
            Page {pageNumber} of {numPages}
          </span>

          <motion.button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: pageNumber < numPages ? 1.05 : 1 }}
            whileTap={{ scale: pageNumber < numPages ? 0.95 : 1 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Download Button */}
        <motion.a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#FF8C69] text-white rounded-lg hover:bg-[#ff7a52] transition-colors font-medium text-sm flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download
        </motion.a>
      </div>

      {/* PDF Document */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="shadow-2xl rounded-lg overflow-hidden bg-white"
        >
          {loading && (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8C69]"></div>
            </div>
          )}

          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8C69]"></div>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
                <svg
                  className="w-20 h-20 text-red-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Failed to load PDF
                </h3>
                <p className="text-gray-600">
                  Please check the PDF URL or try again later.
                </p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="max-w-full"
            />
          </Document>
        </motion.div>
      </div>

      {/* Mobile-optimized keyboard shortcuts hint */}
      <div className="hidden md:block p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 text-center">
        <span className="mr-4">← → Navigate pages</span>
        <span>+ - Zoom in/out</span>
      </div>
    </div>
  );
}
