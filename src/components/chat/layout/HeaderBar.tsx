import React from 'react';

const HeaderBar: React.FC<{ onProfileClick?: () => void }> = ({ onProfileClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 px-6 flex justify-end items-center">
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
          <i className="fas fa-cog text-gray-600"></i>
        </button>
        <button
          onClick={onProfileClick}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <i className="fas fa-user text-gray-600"></i>
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
