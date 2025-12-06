export interface Channel {
  id: string;
  name: string;
  logo?: string;
  group: string;
  url: string;
  tvgId?: string;
}

export interface ChannelGroup {
  name: string;
  channels: Channel[];
}

export interface EPGProgram {
  id: string;
  channelId: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

export enum ViewMode {
  PLAYER_ONLY = 'PLAYER_ONLY',
  GUIDE = 'GUIDE',
  SETTINGS = 'SETTINGS',
  INFO = 'INFO'
}

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
}