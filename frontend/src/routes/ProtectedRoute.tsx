import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';
import { ROUTES } from '../constants';

/** Redirects unauthenticated users to /login, preserving the intended path. */
export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();
  return isAuthenticated
    ? <Outlet />
    : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
};

/** Redirects already-authenticated users away from auth pages (login, signup…). */
export const PublicRoute = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Outlet />;
};
