import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Video, Brain, CheckSquare, BarChart2,
  Settings, LogOut, ChevronRight, Users, Bell,
  Hash, PanelLeft, Zap,
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleSidebar, setMobileSidebar } from '../../store/slices/uiSlice';
import { clearAuth } from '../../store/slices/authSlice';
import { ROUTES } from '../../constants';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

const NAV_PRIMARY = [
  { label: 'Dashboard',    icon: LayoutDashboard, to: ROUTES.DASHBOARD },
  { label: 'Meetings',     icon: Video,           to: ROUTES.LOBBY },
  { label: 'Teams',        icon: Users,           to: ROUTES.TEAMS },
  { label: 'Channels',     icon: Hash,            to: '/teams' },
];

const NAV_TOOLS = [
  { label: 'AI Summary',    icon: Brain,       to: ROUTES.AI_SUMMARY },
  { label: 'Tasks',         icon: CheckSquare, to: ROUTES.TASKS },
  { label: 'Analytics',     icon: BarChart2,   to: ROUTES.ANALYTICS },
  { label: 'Notifications', icon: Bell,        to: ROUTES.NOTIFICATIONS },
];

const NAV_BOTTOM = [
  { label: 'Settings', icon: Settings, to: ROUTES.SETTINGS },
];

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  to: string;
  collapsed: boolean;
  badge?: number;
}

const NavItem = ({ label, icon: Icon, to, collapsed, badge }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'group relative flex items-center rounded-lg text-sm transition-all duration-150 outline-none',
        collapsed ? 'h-9 w-9 justify-center mx-auto' : 'h-9 gap-2.5 px-3',
        isActive
          ? 'bg-blue-50 text-blue-700 font-semibold'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 font-medium'
      )
    }
  >
    {({ isActive }) => (
      <>
        {isActive && !collapsed && (
          <motion.span
            layoutId="sidebarActiveIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 rounded-r-full"
          />
        )}

        <Icon size={16} className="shrink-0" aria-hidden="true" />

        {!collapsed && <span className="truncate">{label}</span>}

        {badge && badge > 0 && !collapsed && (
          <span className="ml-auto min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
            {badge > 9 ? '9+' : badge}
          </span>
        )}

        {collapsed && (
          <span
            role="tooltip"
            className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg pointer-events-none bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 shadow-lg z-50"
          >
            {label}
          </span>
        )}
      </>
    )}
  </NavLink>
);

const NavSection = ({
  label, children, collapsed,
}: { label: string; children: React.ReactNode; collapsed: boolean }) => (
  <div className="flex flex-col gap-0.5">
    <AnimatePresence>
      {!collapsed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1 mt-1 select-none"
        >
          {label}
        </motion.p>
      )}
    </AnimatePresence>
    {children}
  </div>
);

const Sidebar = () => {
  const collapsed         = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileSidebarOpen = useAppSelector((s) => s.ui.mobileSidebarOpen);
  const user              = useAppSelector((s) => s.auth.user);
  const dispatch          = useAppDispatch();
  const navigate          = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(setMobileSidebar(false));
    toast.success('Signed out');
    navigate(ROUTES.LOGIN);
  };

  const initial = user?.name?.charAt(0).toUpperCase() ?? 'U';
  const name    = user?.name ?? 'User';
  const email   = user?.email ?? '';

  return (
    <aside
      className={clsx(
        'sidebar flex flex-col',
        collapsed && 'collapsed',
        mobileSidebarOpen && 'mobile-open'
      )}
      aria-label="Main navigation"
    >
      {/* ── Logo bar ── */}
      <div
        className={clsx(
          'flex items-center border-b border-gray-100 shrink-0 h-14',
          collapsed ? 'justify-center' : 'gap-2.5 px-4'
        )}
      >
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
          <Zap size={14} className="text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="flex items-center flex-1 min-w-0"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-bold text-gray-900 text-sm tracking-tight truncate">IntellMeet</span>
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="ml-auto p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
                aria-label="Collapse sidebar"
              >
                <PanelLeft size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="absolute right-1.5 top-[18px] p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={13} />
          </button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-4 p-2 flex-1 overflow-y-auto overflow-x-hidden" aria-label="Primary">
        <NavSection label="Workspace" collapsed={collapsed}>
          {NAV_PRIMARY.map((item) => (
            <NavItem key={item.label} {...item} collapsed={collapsed} />
          ))}
        </NavSection>

        <div className="h-px bg-gray-100 mx-1" />

        <NavSection label="Tools" collapsed={collapsed}>
          {NAV_TOOLS.map((item) => (
            <NavItem key={item.label} {...item} collapsed={collapsed} />
          ))}
        </NavSection>
      </nav>

      {/* ── Bottom section ── */}
      <div className="border-t border-gray-100 p-2 flex flex-col gap-0.5 shrink-0">
        {NAV_BOTTOM.map((item) => (
          <NavItem key={item.label} {...item} collapsed={collapsed} />
        ))}

        <button
          onClick={handleLogout}
          title={collapsed ? 'Sign out' : undefined}
          className={clsx(
            'group relative flex items-center rounded-lg text-sm transition-all duration-150 font-medium',
            'text-gray-400 hover:bg-red-50 hover:text-red-600',
            collapsed ? 'h-9 w-9 justify-center mx-auto' : 'h-9 gap-2.5 px-3'
          )}
          aria-label="Sign out"
        >
          <LogOut size={16} className="shrink-0" aria-hidden="true" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign out
              </motion.span>
            )}
          </AnimatePresence>
          {collapsed && (
            <span className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg pointer-events-none bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50">
              Sign out
            </span>
          )}
        </button>

        {/* ── User profile ── */}
        <button
          onClick={() => navigate(ROUTES.PROFILE)}
          className={clsx(
            'group flex items-center gap-2.5 rounded-lg px-2 py-2 mt-1 transition-all duration-150',
            'hover:bg-gray-50 w-full text-left',
            collapsed && 'justify-center px-0'
          )}
          aria-label={`Profile: ${name}`}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold bg-blue-600">
            {initial}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-xs font-semibold text-gray-800 truncate leading-tight">{name}</p>
                <p className="text-[11px] text-gray-400 truncate leading-tight">{email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
