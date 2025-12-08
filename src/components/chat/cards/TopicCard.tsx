import React from 'react';

interface TopicCardProps {
  icon: string;
  title: string;
  description: string;
  example: string;
  onClick?: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ icon, title, description, example, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow w-full"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <i className={`fas ${icon} text-white text-sm`}></i>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      </div>
      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{description}</p>
      <div className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full inline-block leading-tight">示例：{example}</div>
    </button>
  );
};

export default TopicCard;
