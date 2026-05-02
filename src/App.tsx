import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import NoticesPage from './pages/NoticesPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormResponsesPage from './pages/FormResponsesPage';
import FormResponseDetailPage from './pages/FormResponseDetailPage';
import EventIntelligencePage from './pages/EventIntelligencePage';
import EventRegistrantsPage from './pages/EventRegistrantsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import PublicationsPage from './pages/PublicationsPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/members" element={<MembersPage />} />
          <Route path="/admin/notices" element={<NoticesPage />} />
          <Route path="/admin/events" element={<EventsPage />} />
          <Route path="/admin/events/analytics" element={<EventIntelligencePage />} />
          <Route path="/admin/events/:id/registrants" element={<EventRegistrantsPage />} />
          <Route path="/admin/forms" element={<FormBuilderPage />} />
          <Route path="/admin/forms/responses" element={<FormResponsesPage />} />
          <Route path="/admin/forms/:id/responses" element={<FormResponseDetailPage />} />
          <Route path="/admin/infos/activities" element={<ActivitiesPage />} />
          <Route path="/admin/infos/publications" element={<PublicationsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
