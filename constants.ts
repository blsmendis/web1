import { Channel } from './types';

// A small list of public, free-to-use streams for demo purposes
export const DEMO_CHANNELS: Channel[] = [
  {
    id: 'demo-1',
    name: 'Sintel (Animation)',
    group: 'Movies',
    url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sintel_poster.jpg/320px-Sintel_poster.jpg'
  },
  {
    id: 'demo-2',
    name: 'Big Buck Bunny',
    group: 'Movies',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/320px-Big_buck_bunny_poster_big.jpg'
  },
  {
    id: 'demo-3',
    name: 'NASA TV',
    group: 'Science',
    url: 'https://ntv1.akamaized.net/hls/live/2013530/NASA-NTV1-HLS/master.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg'
  },
  {
    id: 'demo-4',
    name: 'Tears of Steel',
    group: 'Movies',
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tears_of_Steel_poster.jpg/320px-Tears_of_Steel_poster.jpg'
  },
  {
    id: 'demo-5',
    name: 'Cosmos (Demo)',
    group: 'Science',
    url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    logo: 'https://picsum.photos/200/200'
  }
];

export const MOCK_GROUPS = ['All Channels', 'Movies', 'Science', 'News', 'Sports', 'Kids'];
