export interface MusicTrack {
    trackId: number;
    trackName: string;
    artistName: string;
    albumName: string;
    artworkUrl100: string;
    previewUrl: string;
    trackPrice: number;
    currency: string;
    releaseDate: string;
    genre: string;
    setSelectedMusic?:()=>void;
  }