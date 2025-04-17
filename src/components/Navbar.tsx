import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 blur-sm group-hover:blur transition duration-300"></div>
            <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full border border-gray-200">
              <Sparkles className="h-6 w-6 text-purple-600 group-hover:animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Wheel of Names
            </h1>
            <p className="text-xs text-gray-500">Spin to decide</p>
          </div>
        </div>
      </div>
    </nav>
  );
}