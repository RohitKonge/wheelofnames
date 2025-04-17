import React from 'react';
import Navbar from './components/Navbar';
import Wheel from './components/Wheel';
import EntryList from './components/EntryList';
import WinnersList from './components/WinnersList';
import WinnerModal from './components/WinnerModal';
import InfoSection from './components/InfoSection';
import useStore from './store';

function App() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <Navbar />
        
        <main className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
            <div className="flex flex-col gap-8 w-full lg:w-auto">
              <Wheel />
              <WinnersList />
            </div>
            <div className="w-full md:w-auto">
              <EntryList />
            </div>
          </div>
        </main>

        <div className="py-12 bg-white/50 backdrop-blur-sm relative z-10">
          <InfoSection />
        </div>
        
        <footer className="bg-white/80 py-6 text-center text-gray-600 text-sm border-t border-gray-200 backdrop-blur-sm relative z-10">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Wheel of Names. All rights reserved.</p>
          </div>
        </footer>
        
        <WinnerModal />
      </div>
    </div>
  );
}

export default App;