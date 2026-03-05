import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState, Component, Suspense, lazy } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";

const TeamPage = lazy(() => import("./pages/TeamPage"));
const EventsPage = lazy(() => import("./pages/Events/EventsPage"));
const PublicationsPage = lazy(
  () => import("./pages/Publications/PublicationsPage")
);
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AlumniPage = lazy(() => import("./pages/Alumni/AlumniPage"));
const GalleryPage = lazy(() => import("./pages/Gallery/GalleryPage"));
const CanvasPage = lazy(() => import("./pages/Canvas/CanvasPage"));
const MagazineIssues = lazy(() => import("./pages/MagazineIssues"));
const ArunodayLivePage = lazy(() => import("./pages/ArunodayLive/ArunodayLivePage"));
const DebateRegistrationPage = lazy(() => import("./pages/DebateRegistrationPage"));

// MUN Pages
const MunPage = lazy(() => import("./pages/MUN/MunPage"));

// ADC Page (Hidden)
// const ADCPage = lazy(() => import("./pages/ADC/ADCPage"));
const MunLoginPage = lazy(() => import("./pages/MUN/MunLoginPage"));
const MunRegisterPage = lazy(() => import("./pages/MUN/MunRegisterPage"));
const MunCompleteProfilePage = lazy(() => import("./pages/MUN/MunCompleteProfilePage"));
const MunDashboardPage = lazy(() => import("./pages/MUN/MunDashboardPage"));
const MunEventsPage = lazy(() => import("./pages/MUN/MunEventsPage"));
const MunApplyPage = lazy(() => import("./pages/MUN/MunApplyPage"));
const MunAdminPage = lazy(() => import("./pages/MUN/MunAdminPage"));
const MunProfileDashboard = lazy(() => import("./pages/MUN/MunProfileDashboard"));
const MunAdminDashboard = lazy(() => import("./pages/MUN/MunAdminDashboard"));
const MunSelectCommitteePage = lazy(() => import("./pages/MUN/MunSelectCommitteePage"));

// Admin Pages
const AdminDashboardPage = lazy(() => import("./pages/Admin/AdminDashboardPage"));
const UserInfoPage = lazy(() => import("./pages/Admin/UserInfoPage"));
const CertificatePage = lazy(() => import("./pages/Admin/CertificatePage"));

// Auth Pages
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));
const DashboardPage = lazy(() => import("./pages/Auth/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/Auth/ProfilePage"));

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
    <AuthProvider>
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
              <Suspense
                fallback={
                  <div className="min-h-[60vh] flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red" />
                  </div>
                }
              >
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route
                      path="/publications"
                      element={<PublicationsPage />}
                    />
                    <Route path="/magazine" element={<MagazineIssues />} />
                    <Route path="/alumni" element={<AlumniPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/canvas" element={<CanvasPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/arunoday-live" element={<ArunodayLivePage />} />
                    <Route path="/debate-registration" element={<DebateRegistrationPage />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* ADC Route (Hidden) */}
                    {/* <Route path="/adc" element={<ADCPage />} /> */}

                    {/* MUN Routes */}
                    <Route path="/mun" element={<MunPage />} />
                    <Route path="/mun/login" element={<MunLoginPage />} />
                    <Route path="/mun/register" element={<MunRegisterPage />} />
                    <Route path="/mun/complete-profile" element={<MunCompleteProfilePage />} />
                    <Route path="/mun/dashboard" element={<MunDashboardPage />} />
                    <Route path="/mun/select-committee" element={<MunSelectCommitteePage />} />
                    <Route path="/mun/events" element={<MunEventsPage />} />
                    <Route path="/mun/profile" element={<MunProfileDashboard />} />
                    <Route path="/mun/apply/:eventId" element={<MunApplyPage />} />
                    <Route path="/mun/admin" element={<MunAdminPage />} />
                    <Route path="/mun/admin-dashboard" element={<MunAdminDashboard />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/user-info" element={<UserInfoPage />} />
                    <Route path="/admin/certificates" element={<CertificatePage />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>
            <Footer />
          </div>

        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
