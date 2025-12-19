import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState, Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import EventsPage from "./pages/Events/EventsPage";
import PublicationsPage from "./pages/Publications/PublicationsPage";
import ContactPage from "./pages/ContactPage";
import AlumniPage from "./pages/Alumni/AlumniPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import CanvasPage from "./pages/Canvas/CanvasPage";
import MagazineIssues from "./pages/MagazineIssues";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              An unexpected error occurred while rendering the application.
              Check the console for details.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Disable splash screen by default to avoid blank screen issues
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return (
    <>
      {showSplash && (
        <AnimatePresence>
          <SplashScreen onComplete={() => setShowSplash(false)} />
        </AnimatePresence>
      )}

      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <div className="bg-brand-white">
            <Navbar />
            <main className="pt-20">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/publications" element={<PublicationsPage />} />
                  <Route path="/magazine" element={<MagazineIssues />} />
                  <Route path="/alumni" element={<AlumniPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/canvas" element={<CanvasPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
