import React from 'react';
import { Trophy, Clock, Calendar } from 'lucide-react';
import useStore from '../store';

export default function WinnersList() {
  const { winners } = useStore();

  if (winners.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <Trophy className="text-yellow-500" size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Previous Winners</h2>
        <span className="inline-flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full px-2 py-0.5 ml-auto">
          {winners.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
        {winners.map((winner, index) => {
          const date = new Date(winner.timestamp);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return (
            <div
              key={winner.id}
              className="p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/60 dark:to-gray-700 rounded-xl flex flex-col hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600/50"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs">
                  {index + 1}
                </span>
                <span className="font-medium text-lg text-gray-800 dark:text-white">
                  {winner.name}
                </span>
              </div>
              
              <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400 text-xs">
                <div className="flex items-center mr-3">
                  <Calendar size={12} className="mr-1" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {formattedTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}