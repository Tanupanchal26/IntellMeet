import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './Navbar';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch';
import { setMobileSidebar } from '../../store/slices/uiSlice';
import { ROUTES } from '../../constants';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':     'Dashboard',
  '/lobby':         'Meetings',
  '/analytics':     'Analytics',
  '/tasks':         'Task Board',
  '/settings':      'Settings',
  '/profile':       'Profile',
  '/ai-summary':    'AI Summary',
  '/teams':         'Teams',
  '/notifications': 'Notifications',
  '/channels':      'Channels',
};

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -4 },
};

const AppLayout = () => {
  const isAuthenticated   = useAppSelector((s) => s.auth.isAuthenticated);
  const mobileSidebarOpen = useAppSelector((s) => s.ui.mobileSidebarOpen);
  const dispatch          = useAppDispatch();
  const { pathname }      = useLocation();

  if (!isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;

  const title = PAGE_TITLES[pathname] ?? '';

  return (
    <div className="app-layout">
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[35] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => dispatch(setMobileSidebar(false))}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <Sidebar />

      <div className="main-area">
        <TopBar title={title} />

        <main
          id="main-content"
          className="page-content"
          tabIndex={-1}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={PAGE_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
