import { Search, Menu, Plus, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch';
import { setMobileSidebar } from '../../store/slices/uiSlice';
import NotificationCenter from '../common/NotificationCenter';
import Button from '../common/Button';
import { ROUTES } from '../../constants';
import { clsx } from 'clsx';

interface Props { title?: string; }

const TopBar = ({ title }: Props) => {
  const user     = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initial  = user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <header className="top-bar" role="banner">
      {/* Left: mobile toggle + title */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => dispatch(setMobileSidebar(true))}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        {title && (
          <h1 className="text-sm font-semibold text-gray-900 tracking-tight hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      {/* Center: search */}
      <div className="flex-1 max-w-[360px] mx-auto">
        <div className="search-bar">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            placeholder="Search meetings, tasks, people…"
            aria-label="Search"
          />
          <kbd
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none"
            aria-label="Keyboard shortcut: Command K"
          >
            <span className="text-[11px] text-gray-400 font-medium">⌘K</span>
          </kbd>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus size={13} />}
          onClick={() => navigate(ROUTES.LOBBY)}
          className="hidden sm:inline-flex"
          aria-label="Start new meeting"
        >
          New Meeting
        </Button>

        <button
          onClick={() => navigate(ROUTES.LOBBY)}
          className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="New meeting"
        >
          <Video size={17} />
        </button>

        <NotificationCenter />

        {/* Avatar */}
        <button
          onClick={() => navigate(ROUTES.PROFILE)}
          className={clsx(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
            'text-white text-xs font-bold bg-blue-600',
            'hover:ring-2 hover:ring-blue-500/30 hover:ring-offset-1',
            'transition-all duration-150',
          )}
          aria-label={`Open profile for ${user?.name ?? 'User'}`}
        >
          {initial}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
