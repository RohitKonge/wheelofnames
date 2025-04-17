export interface WheelEntry {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Winner {
  id: string;
  name: string;
  timestamp: number;
}

export interface WheelState {
  entries: WheelEntry[];
  winners: Winner[];
  isSpinning: boolean;
  darkMode: boolean;
  hasSpunOnce: boolean;
  showWinnerModal: boolean;
  currentWinner: Winner | null;
  addEntry: (name: string) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, name: string) => void;
  setImageUrl: (id: string, url: string) => void;
  shuffleEntries: () => void;
  sortEntries: () => void;
  toggleDarkMode: () => void;
  setSpinning: (spinning: boolean) => void;
  setHasSpunOnce: (hasSpun: boolean) => void;
  addWinner: (winner: Winner) => void;
  removeWinner: (id: string) => void;
  setShowWinnerModal: (show: boolean) => void;
  setCurrentWinner: (winner: Winner | null) => void;
}