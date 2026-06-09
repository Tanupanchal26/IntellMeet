import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Loader from './components/common/Loader';
import { ROUTES } from './utils/constants';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Lobby = lazy(() => import('./pages/Lobby'));
const MeetingRoom = lazy(() => import('./pages/MeetingRoom'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const AppRoutes = () => (
  <Suspense fallback={<Loader fullPage />}>
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      
      {/* Protected Routes sharing Sidebar/Navbar */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.LOBBY} element={<Lobby />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>

      {/* Standalone Meeting Room */}
      <Route path={ROUTES.MEETING} element={<MeetingRoom />} />

      {/* 404 Route */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
