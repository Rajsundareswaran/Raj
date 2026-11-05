import React from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { ALL_15_SCREENS } from '../data/mockData';

function renderAtRoute(route: string) {
  window.history.pushState({}, 'Test Page', route);
  return render(<App />);
}

describe('CITYLENS Phase 1 — All 15 Screens & Interactive Workflows', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registers all 15 Figma screens in the Screen Directory', () => {
    expect(ALL_15_SCREENS).toHaveLength(15);
  });

  it('Screen 01 (/) renders Landing Page and opens Incident Modal on corridor pin click', () => {
    renderAtRoute('/');
    expect(screen.getByText(/Navigate Chennai\./i)).toBeInTheDocument();
    expect(screen.getByText(/Unifying AI Intelligence with Real-World Commutes/i)).toBeInTheDocument();

    // Click sample pin on landing corridor preview -> opens Screen 06 modal
    fireEvent.click(screen.getByRole('button', { name: /Waterlogging: Velachery Main Rd/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Telemetry & Audit Metadata/i)).toBeInTheDocument();
  });

  it('Screen 02 (/select-role) renders Citizen and Admin role selection gateway', () => {
    renderAtRoute('/select-role');
    expect(screen.getByText(/Welcome to Mobility Intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/Citizen & Commuter Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin & Operations Portal/i)).toBeInTheDocument();
  });

  it('Screen 03 (/citizen/login) validates inputs and signs in to Citizen Dashboard', () => {
    renderAtRoute('/citizen/login');
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In to Mobility Intelligence/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);

    fireEvent.change(emailInput, { target: { value: 'commuter@chennai.org' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In to Mobility Intelligence/i }));
    expect(screen.getByText(/Corridor Transit Intel/i)).toBeInTheDocument();
  });

  it('Screen 04 (/citizen/signup) validates registration and navigates to Route Planner', () => {
    renderAtRoute('/citizen/signup');
    expect(screen.getByText(/Create Your Account/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Create Citizen Account/i }));
    expect(screen.getByText(/Corridor Transit Intel/i)).toBeInTheDocument();
  });

  it('Screen 05 (/dashboard) & Screen 06 Modal support route mode switching and inspecting incident details', () => {
    renderAtRoute('/dashboard');
    expect(screen.getByText(/Corridor Transit Intel/i)).toBeInTheDocument();

    // Switch transit modality to Metro
    fireEvent.click(screen.getByRole('button', { name: /Metro/i }));
    expect(screen.getByText(/22% \(Low\)/i)).toBeInTheDocument();

    // Open Screen 06 popup via "Inspect details"
    fireEvent.click(screen.getByRole('button', { name: /Inspect details/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/AI Confidence Score \(Demo\)/i)).toBeInTheDocument();
  });

  it('Screen 06 (/citizen/incidents/CHN-88412) works as a standalone route as well', () => {
    renderAtRoute('/citizen/incidents/CHN-88412');
    expect(
      screen.getByText(/Waterlogging at Pallavaram GST Underpass/i)
    ).toBeInTheDocument();
  });

  it('Screen 07 -> Screen 08 submits a citizen hazard report and displays generated reference ID', () => {
    renderAtRoute('/citizen/report');
    expect(screen.getByText(/Report a Road Issue/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^Potholes$/i }));
    fireEvent.change(screen.getByLabelText(/2\. Incident Title/i), {
      target: { value: 'Large pothole near Adyar Signal' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit Incident Report/i }));
    expect(screen.getByText(/Report Submitted Successfully!/i)).toBeInTheDocument();
    expect(screen.getByText(/\+25 Civic Karma Points awarded/i)).toBeInTheDocument();
  });

  it('Screen 07 -> Screen 09 simulates timeout failure, caches draft, and retries to Screen 08', () => {
    renderAtRoute('/citizen/report');
    fireEvent.click(screen.getByRole('button', { name: /Simulate Timeout \(Screen 09\)/i }));

    expect(screen.getByText(/Unable to Submit Your Report/i)).toBeInTheDocument();
    expect(screen.getByText(/ERR_GATEWAY_TIMEOUT/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Retry Submission Now/i }));
    expect(screen.getByText(/Report Submitted Successfully!/i)).toBeInTheDocument();
  });

  it('Screen 10 (/admin/login) validates 6-digit PIN and navigates to Admin Dashboard', () => {
    renderAtRoute('/admin/login');
    expect(screen.getByText(/Integrated Mobility Command/i)).toBeInTheDocument();

    const pinInput = screen.getByLabelText(/Employee Security PIN/i);
    fireEvent.change(pinInput, { target: { value: '12' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In as Admin/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/6-digit/i);

    fireEvent.change(pinInput, { target: { value: '940122' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In as Admin/i }));
    expect(screen.getByText(/Mobility Operations Dashboard/i)).toBeInTheDocument();
  });

  it('Screen 11 (/admin/signup) validates clearance token and creates demo admin session', () => {
    renderAtRoute('/admin/signup');
    expect(
      screen.getByRole('heading', { name: /Create Admin Account/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Create Admin Account/i }));
    expect(screen.getByText(/Mobility Operations Dashboard/i)).toBeInTheDocument();
  });

  it('Screen 12 (/admin/dashboard) filters reports and triggers CSV export', () => {
    renderAtRoute('/admin/dashboard');
    expect(screen.getByText(/Mobility Operations Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText('#CHN-88412')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Filter by verification status/i), {
      target: { value: 'Pending' },
    });
    expect(screen.getByText('#CHN-88412')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Export CSV/i }));
    expect(screen.getByText(/CSV Export Downloaded/i)).toBeInTheDocument();
  });

  it('Screen 13 (/admin/reports/CHN-88412) verifies, dispatches crew, and resolves an incident', () => {
    renderAtRoute('/admin/reports/CHN-88412');
    expect(screen.getByText(/Incident Report Details/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Mark as Verified & Broadcast Alert/i }));
    expect(screen.getByText(/#CHN-88412 marked as Verified/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Dispatch GCC Ward Crew/i }));
    expect(screen.getByText(/✓ GCC Crew Dispatched/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Mark as Resolved/i }));
    expect(screen.getByText(/#CHN-88412 marked as Resolved/i)).toBeInTheDocument();
  });

  it('Screen 14 (/admin/ai-monitor) renders English & Tamil NLP cards and converts stream item to incident', () => {
    renderAtRoute('/admin/ai-monitor');
    expect(screen.getByText(/AI Incident Monitoring/i)).toBeInTheDocument();
    expect(
      screen.getByText(/வேளச்சேரி 100 அடி சாலையில் மின் கம்பம் சாய்ந்தது/)
    ).toBeInTheDocument();

    const convertButtons = screen.getAllByRole('button', {
      name: /Convert to Verified Incident/i,
    });
    fireEvent.click(convertButtons[0]);
    expect(screen.getByText(/Converted \(#CHN-/i)).toBeInTheDocument();
  });

  it('Screen 15 (/admin/resolved) renders resolved archive records and exports compliance CSV', () => {
    renderAtRoute('/admin/resolved');
    expect(
      screen.getByText(/Resolved Incidents & Maintenance Archive/i)
    ).toBeInTheDocument();
    expect(screen.getByText('#CHN-88240')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Export Compliance Report/i }));
    expect(screen.getByText(/Compliance CSV Exported/i)).toBeInTheDocument();
  });
});
