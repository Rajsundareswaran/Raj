import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CitizenHeader } from '../../components/layouts/CitizenHeader';
import { AppFooter } from '../../components/common/AppFooter';
import { IncidentDetailsModal } from '../../components/modals/IncidentDetailsModal';
import { useCityLens } from '../../context/CityLensContext';

/**
 * Screen 06 — Standalone route wrapper (/citizen/incidents/:id) so Screen 06 can be
 * inspected both as an overlay popup on Screen 05 AND via direct route navigation.
 */
export const IncidentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { incidents, confirmIncidentByCommuter, pushToast } = useCityLens();

  const normalizedId = id ? (id.startsWith('#') ? id : `#${id}`) : '#CHN-88412';
  const incident =
    incidents.find((item) => item.id.toLowerCase() === normalizedId.toLowerCase()) ||
    incidents[0];

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100">
      <CitizenHeader />
      <main className="flex-1 gis-grid-bg">
        <IncidentDetailsModal
          incident={incident}
          standalone
          onClose={() => navigate('/dashboard')}
          onSuggestDetour={(inc) => {
            pushToast(
              `Detour Suggested: ${inc.suggestedDetour}`,
              'Returning to Route Planner with corridor advisory.',
              'info'
            );
            navigate('/dashboard');
          }}
          onConfirmStatus={(inc) => confirmIncidentByCommuter(inc.id)}
        />
      </main>
      <AppFooter />
    </div>
  );
};
