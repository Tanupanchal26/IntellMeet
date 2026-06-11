import { useEffect, useRef } from 'react';
import { MicOff, VideoOff, Pin } from 'lucide-react';
import { useMeetingStore } from '../../store/meeting.store';
import { useAuthStore } from '../../store/auth.store';
import { clsx } from 'clsx';

const VideoTile = ({ name, isMuted, isVideoOff, isActive, isLocal }: {
  name: string; isMuted: boolean; isVideoOff: boolean; isActive?: boolean; isLocal?: boolean;
}) => (
  <div className={clsx('video-tile flex items-center justify-center', isActive && 'video-tile--active')}>
    {isVideoOff ? (
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">{name}</span>
      </div>
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
    )}
    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
      <span className="text-xs text-white bg-black/50 rounded px-1.5 py-0.5 backdrop-blur-sm">
        {name}{isLocal ? ' (You)' : ''}
      </span>
      <div className="flex gap-1">
        {isMuted && <div className="w-5 h-5 rounded bg-red-500/80 flex items-center justify-center"><MicOff size={11} className="text-white" /></div>}
        {isVideoOff && <div className="w-5 h-5 rounded bg-gray-600/80 flex items-center justify-center"><VideoOff size={11} className="text-white" /></div>}
      </div>
    </div>
  </div>
);

const VideoGrid = () => {
  const { participants, isVideoOff, isMuted } = useMeetingStore();
  const { user } = useAuthStore();

  const allTiles = [
    { id: 'local', name: user?.name || 'You', isMuted, isVideoOff, isLocal: true, isActive: true },
    ...participants.map(p => ({ id: p.socketId, name: p.name, isMuted: p.isMuted, isVideoOff: p.isVideoOff, isLocal: false, isActive: false }))
  ];

  const gridCols = allTiles.length <= 1 ? 'grid-cols-1' : allTiles.length <= 4 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-2 h-full p-2`}>
      {allTiles.map(tile => <VideoTile key={tile.id} {...tile} />)}
    </div>
  );
};

export default VideoGrid;
