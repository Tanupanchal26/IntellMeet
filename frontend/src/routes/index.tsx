import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import Loader from '../components/common/Loader';
import { ROUTES } from '../constants';

const Login          = lazy(() => import('../pages/Login'));
const Signup         = lazy(() => import('../pages/Signup'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword  = lazy(() => import('../pages/ResetPassword'));
const Dashboard      = lazy(() => import('../pages/Dashboard'));
const Profile        = lazy(() => import('../pages/Profile'));
const Settings       = lazy(() => import('../pages/Settings'));
const Home           = lazy(() => import('../pages/Home'));
const Lobby          = lazy(() => import('../pages/Lobby'));
const MeetingRoom    = lazy(() => import('../pages/MeetingRoom'));
const Analytics      = lazy(() => import('../pages/Analytics'));
const Tasks          = lazy(() => import('../pages/Tasks'));
const AISummary      = lazy(() => import('../pages/AISummary'));
const Teams          = lazy(() => import('../pages/Teams'));
const Channels       = lazy(() => import('../pages/Channels'));
const Notifications  = lazy(() => import('../pages/Notifications'));
const NotFound       = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
  <Suspense fallback={<Loader fullPage />}>
    <Routes>
      {/* Public landing */}
      <Route path={ROUTES.HOME} element={<Home />} />

      {/* Auth pages — redirect to dashboard if already logged in */}
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.LOGIN}           element={<Login />} />
        <Route path={ROUTES.SIGNUP}          element={<Signup />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD}  element={<ResetPassword />} />
      </Route>

      {/* Private pages — redirect to login if not authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD}  element={<Dashboard />} />
          <Route path={ROUTES.LOBBY}      element={<Lobby />} />
          <Route path={ROUTES.ANALYTICS}  element={<Analytics />} />
          <Route path={ROUTES.TASKS}      element={<Tasks />} />
          <Route path={ROUTES.SETTINGS}   element={<Settings />} />
          <Route path={ROUTES.PROFILE}    element={<Profile />} />
          <Route path={ROUTES.AI_SUMMARY}    element={<AISummary />} />
          <Route path={ROUTES.TEAMS}          element={<Teams />} />
          <Route path={ROUTES.TEAM}           element={<Channels />} />
          <Route path={ROUTES.CHANNELS}       element={<Channels />} />
          <Route path={ROUTES.NOTIFICATIONS}  element={<Notifications />} />
        </Route>
        <Route path={ROUTES.MEETING} element={<MeetingRoom />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
