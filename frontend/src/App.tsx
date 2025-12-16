import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <Router>
        <ScrollToTop />
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
      </Router>
    </>
  );
}

export default App;
