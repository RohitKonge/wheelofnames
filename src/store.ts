import { create } from 'zustand';
import { WheelState, Winner } from './types';

const useStore = create<WheelState>((set) => ({
  entries: [
    { id: '1', name: 'Emma' },
    { id: '2', name: 'Liam' },
    { id: '3', name: 'Olivia' },
    { id: '4', name: 'Noah' },
    { id: '5', name: 'Ava' },
    { id: '6', name: 'Ethan' },
    { id: '7', name: 'Sophia' },
    { id: '8', name: 'Mason' },
  ],
  winners: [],
  isSpinning: false,
  darkMode: false,
  hasSpunOnce: false,
  showWinnerModal: false,
  currentWinner: null,
  
  addEntry: (name) =>
    set((state) => ({
      entries: [...state.entries, { id: crypto.randomUUID(), name }],
    })),
    
  removeEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
    
  updateEntry: (id, name) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, name } : entry
      ),
    })),
    
  setImageUrl: (id, url) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, imageUrl: url } : entry
      ),
    })),
    
  shuffleEntries: () =>
    set((state) => ({
      entries: [...state.entries].sort(() => Math.random() - 0.5),
    })),
    
  sortEntries: () =>
    set((state) => ({
      entries: [...state.entries].sort((a, b) => a.name.localeCompare(b.name)),
    })),
    
  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
    
  setSpinning: (spinning) =>
    set(() => ({
      isSpinning: spinning,
    })),

  setHasSpunOnce: (hasSpun) =>
    set(() => ({
      hasSpunOnce: hasSpun,
    })),

  addWinner: (winner: Winner) =>
    set((state) => ({
      winners: [winner, ...state.winners],
    })),

  removeWinner: (id: string) =>
    set((state) => ({
      winners: state.winners.filter((winner) => winner.id !== id),
    })),

  setShowWinnerModal: (show: boolean) =>
    set(() => ({
      showWinnerModal: show,
    })),

  setCurrentWinner: (winner: Winner | null) =>
    set(() => ({
      currentWinner: winner,
    })),
}));

export default useStore;