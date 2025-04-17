import React, { useEffect } from 'react';
import { X, Award, Trash2, Check } from 'lucide-react';
import useStore from '../store';

export default function WinnerModal() {
  const { showWinnerModal, currentWinner, setShowWinnerModal, removeEntry } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showWinnerModal) {
        setShowWinnerModal(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWinnerModal, setShowWinnerModal]);

  if (!showWinnerModal || !currentWinner) return null;

  const handleRemove = () => {
    removeEntry(currentWinner.id);
    setShowWinnerModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowWinnerModal(false)}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Celebration background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 opacity-90" />
          
          {/* Content */}
          <div className="relative p-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold flex items-center">
                <Award className="mr-2" size={28} />
                We have a winner!
              </h2>
              <button
                onClick={() => setShowWinnerModal(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-white/80 text-sm mb-2">Congratulations to:</p>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="mb-4 transform animate-bounce inline-block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
            <Award size={42} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
            {currentWinner.name}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Selected at {new Date(currentWinner.timestamp).toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowWinnerModal(false)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Check size={18} />
            <span>OK</span>
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-l border-gray-200 dark:border-gray-700"
          >
            <Trash2 size={18} />
            <span>Remove Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
}