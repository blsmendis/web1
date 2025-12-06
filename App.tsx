import React, { useState, useEffect, useCallback } from 'react';
import { Channel, ChannelGroup, ViewMode } from './types';
import { parseM3U, groupChannels } from './services/playlistService';
import { DEMO_CHANNELS } from './constants';
import PlaylistManager from './components/PlaylistManager';
import VideoPlayer from './components/VideoPlayer';
import Guide from './components/Guide';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SETTINGS);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [groups, setGroups] = useState<ChannelGroup[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load playlist logic
  const handleLoadPlaylist = async (source: string | File) => {
    try {
      let content = '';
      if (typeof source === 'string') {
        const res = await fetch(source);
        if (!res.ok) throw new Error('Failed to fetch playlist');
        content = await res.text();
      } else {
        content = await source.text();
      }

      const parsedGroups = parseM3U(content);
      const allChannels = parsedGroups.find(g => g.name === 'All Channels')?.channels || [];

      setGroups(parsedGroups);
      setChannels(allChannels);
      
      if (allChannels.length > 0) {
        setCurrentChannel(allChannels[0]);
        setViewMode(ViewMode.PLAYER_ONLY);
      } else {
        setError('No channels found in playlist.');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading playlist');
      console.error(err);
    }
  };

  const handleLoadDemo = () => {
    const grouped = groupChannels(DEMO_CHANNELS);
    setGroups(grouped);
    setChannels(DEMO_CHANNELS);
    setCurrentChannel(DEMO_CHANNELS[0]);
    setViewMode(ViewMode.PLAYER_ONLY);
  };

  const handleChannelSelect = (channel: Channel) => {
    setCurrentChannel(channel);
    // On mobile, maybe close guide automatically. On desktop/TV, maybe keep open?
    // Let's close it for immersive feel.
    // setViewMode(ViewMode.PLAYER_ONLY); 
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === ViewMode.SETTINGS) return;

      switch (e.key) {
        case 'Escape':
        case 'Backspace':
          if (viewMode === ViewMode.GUIDE) {
            setViewMode(ViewMode.PLAYER_ONLY);
          }
          break;
        case 'g':
        case 'Enter':
          if (viewMode === ViewMode.PLAYER_ONLY) {
            setViewMode(ViewMode.GUIDE);
          }
          break;
        case 'm':
          setIsMuted(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative select-none">
      
      {/* Video Layer */}
      {viewMode !== ViewMode.SETTINGS && (
        <div className="absolute inset-0 z-0">
          <VideoPlayer 
            channel={currentChannel} 
            onError={(msg) => console.error(msg)} // Could show a toast
            isMuted={isMuted}
          />
        </div>
      )}

      {/* Controls Overlay (Only in Player Mode) */}
      {viewMode === ViewMode.PLAYER_ONLY && (
        <Controls 
            channel={currentChannel}
            onToggleGuide={() => setViewMode(ViewMode.GUIDE)}
            onReset={() => {
                setViewMode(ViewMode.SETTINGS);
                setCurrentChannel(null);
            }}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
        />
      )}

      {/* Guide Layer (Overlay) */}
      <Guide 
        visible={viewMode === ViewMode.GUIDE}
        groups={groups}
        currentChannel={currentChannel}
        onSelectChannel={handleChannelSelect}
        onClose={() => setViewMode(ViewMode.PLAYER_ONLY)}
      />

      {/* Settings / Initial Load Layer */}
      {viewMode === ViewMode.SETTINGS && (
        <PlaylistManager 
            onLoadPlaylist={handleLoadPlaylist}
            onLoadDemo={handleLoadDemo}
        />
      )}

      {/* Error Toast */}
      {error && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce">
            {error}
            <button className="ml-4 font-bold" onClick={() => setError(null)}>✕</button>
        </div>
      )}

    </div>
  );
};

export default App;