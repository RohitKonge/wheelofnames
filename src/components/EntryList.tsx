import React, { useState } from 'react';
import { Shuffle, SortAsc, X, Plus, Info } from 'lucide-react';
import useStore from '../store';

export default function EntryList() {
  const [newEntry, setNewEntry] = useState('');
  const { entries, addEntry, removeEntry, updateEntry, shuffleEntries, sortEntries } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.trim()) {
      addEntry(newEntry.trim());
      setNewEntry('');
    }
  };

  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-750">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Wheel Entries</h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={shuffleEntries}
            className="py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-1.5 hover:bg-purple-100 dark:hover:bg-gray-600 shadow-sm hover:shadow border border-gray-200 dark:border-gray-600"
            title="Shuffle"
          >
            <Shuffle size={18} className="text-purple-600 dark:text-purple-400" />
            <span>Shuffle</span>
          </button>
          <button
            onClick={sortEntries}
            className="py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg transition-all duration-300 flex items-center gap-1.5 hover:bg-blue-100 dark:hover:bg-gray-600 shadow-sm hover:shadow border border-gray-200 dark:border-gray-600"
            title="Sort"
          >
            <SortAsc size={18} className="text-blue-600 dark:text-blue-400" />
            <span>Sort</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Add new entry..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={!newEntry.trim()}
            className={`p-2 rounded-lg flex items-center justify-center ${
              newEntry.trim() ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            } transition-colors`}
          >
            <Plus size={20} />
          </button>
        </form>
        
        <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Info size={14} className="mr-1.5" />
          <span>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
        </div>
      </div>

      <div className="p-4 space-y-1.5 max-h-[400px] overflow-y-auto">
        {entries.length === 0 ? (
          <div className="text-center p-6 text-gray-500 dark:text-gray-400">
            <p>No entries yet. Add some names to get started!</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={entry.id}
              className="group flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs">
                {index + 1}
              </span>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => updateEntry(entry.id, e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
              <button
                onClick={() => removeEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}