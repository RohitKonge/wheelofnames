import React from 'react';
import { HelpCircle, Gift, Users, Rotate3D, Shield, Leaf } from 'lucide-react';

export default function InfoSection() {
  const InfoCard = ({ title, children, icon: Icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400">
          <Icon size={24} className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{title}</h2>
          <div className="text-gray-600 dark:text-gray-300 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-4 max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Why use Wheel of Names?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <InfoCard title="Simple Random Selection" icon={Rotate3D}>
          <ul className="space-y-2 list-disc pl-5">
            <li>Random name picker for classrooms</li>
            <li>Giveaway winner selection</li>
            <li>Team member rotation</li>
            <li>Decision making</li>
            <li>Game night activities</li>
          </ul>
        </InfoCard>

        <InfoCard title="Truly Random Results" icon={Gift}>
          <p>
            Our wheel uses a cryptographically secure random number generator to ensure
            fair and unbiased results. The spinning animation is purely visual - the
            winner is determined randomly when you click spin.
          </p>
        </InfoCard>

        <InfoCard title="Complete Privacy" icon={Shield}>
          <p>
            All data is stored locally in your browser. We don't track or store
            any personal information. Your wheel entries are completely private and
            secure.
          </p>
        </InfoCard>

        <InfoCard title="Team Collaboration" icon={Users}>
          <p>
            Perfect for team standups, selecting presenters, or fairly distributing tasks
            among team members. Promotes equality and prevents bias in selection processes.
          </p>
        </InfoCard>

        <InfoCard title="Eco-Friendly" icon={Leaf}>
          <p>
            Our servers run on 100% renewable energy, and we're committed to
            minimizing our carbon footprint through sustainable practices.
          </p>
        </InfoCard>

        <InfoCard title="Need Help?" icon={HelpCircle}>
          <p>
            Have questions about using the wheel? Need assistance with a specific feature?
            Our support team is here to help you get the most out of your wheel experience.
          </p>
        </InfoCard>
      </div>
    </div>
  );
}