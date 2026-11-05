import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { CityLensProvider, useCityLens } from './context/CityLensContext';
import { ToastContainer } from './components/common/ToastContainer';
import { ScreenNavigator } from './components/common/ScreenNavigator';
import { IncidentDetailsModal } from './components/modals/IncidentDetailsModal';

// Public Screens (01 - 02)
import { LandingPage } from './pages/public/LandingPage';
import { RoleSelectionPage } from './pages/public/RoleSelectionPage';

// Citizen Screens (03 - 09)
import { CitizenLoginPage } from './pages/citizen/CitizenLoginPage';
import { CitizenSignupPage } from './pages/citizen/CitizenSignupPage';
import { CitizenDashboardPage } from './pages/citizen/CitizenDashboardPage';
import { IncidentDetailsPage } from './pages/citizen/IncidentDetailsPage';
import { ReportSubmissionPage } from './pages/citizen/ReportSubmissionPage';
import { ReportSuccessPage } from './pages/citizen/ReportSuccessPage';
import { ReportFailurePage } from './pages/citizen/ReportFailurePage';

// Admin Screens (10 - 15)
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminSignupPage } from './pages/admin/AdminSignupPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminReportDetailsPage } from './pages/admin/AdminReportDetailsPage';
import { AIMonitoringPage } from './pages/admin/AIMonitoringPage';
import { AdminResolvedPage } from './pages/admin/AdminResolvedPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const GlobalOverlays: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeIncidentModal,
    closeIncidentModal,
    confirmIncidentByCommuter,
    pushToast,
  } = useCityLens();

  return (
    <>
      <ToastContainer />
      <ScreenNavigator />
      {activeIncidentModal && (
        <IncidentDetailsModal
          incident={activeIncidentModal}
          onClose={closeIncidentModal}
          onSuggestDetour={(inc) => {
            closeIncidentModal();
            pushToast(
              `Bypass Suggested: ${inc.suggestedDetour}`,
              'Viewing corridor route planner.',
              'info'
            );
            navigate('/dashboard');
          }}
          onConfirmStatus={(inc) => confirmIncidentByCommuter(inc.id)}
        />
      )}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <CityLensProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <GlobalOverlays />
        <Routes>
          {/* Screen 01 — Welcome / Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Screen 02 — Login Type Selection */}
          <Route path="/select-role" element={<RoleSelectionPage />} />

          {/* Screen 03 — Citizen Login */}
          <Route path="/citizen/login" element={<CitizenLoginPage />} />

          {/* Screen 04 — Citizen Signup */}
          <Route path="/citizen/signup" element={<CitizenSignupPage />} />

          {/* Screen 05 — Citizen Main Dashboard / Route Planner */}
          <Route path="/dashboard" element={<CitizenDashboardPage />} />

          {/* Screen 06 — Incident Details Popup / Standalone Route */}
          <Route
            path="/citizen/incidents"
            element={<Navigate to="/citizen/incidents/CHN-88412" replace />}
          />
          <Route path="/citizen/incidents/:id" element={<IncidentDetailsPage />} />

          {/* Screen 07 — Citizen Report Submission */}
          <Route path="/citizen/report" element={<ReportSubmissionPage />} />

          {/* Screen 08 — Report Submission Success */}
          <Route path="/citizen/report/success" element={<ReportSuccessPage />} />

          {/* Screen 09 — Report Submission Failure */}
          <Route path="/citizen/report/error" element={<ReportFailurePage />} />

          {/* Screen 10 — Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Screen 11 — Admin Signup */}
          <Route path="/admin/signup" element={<AdminSignupPage />} />

          {/* Screen 12 — Admin Main Dashboard / Report Management */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Screen 13 — Admin Report Details */}
          <Route
            path="/admin/reports"
            element={<Navigate to="/admin/reports/CHN-88412" replace />}
          />
          <Route path="/admin/reports/:id" element={<AdminReportDetailsPage />} />

          {/* Screen 14 — AI Incident Monitoring */}
          <Route path="/admin/ai-monitor" element={<AIMonitoringPage />} />

          {/* Screen 15 — Admin Resolved Reports */}
          <Route path="/admin/resolved" element={<AdminResolvedPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CityLensProvider>
  );
};

export default App;
