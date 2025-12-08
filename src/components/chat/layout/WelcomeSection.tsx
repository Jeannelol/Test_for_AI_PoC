
import { TOPIC_CARDS } from '@/types/chat';
import TopicCard from '@/components/chat/cards/TopicCard';

const WelcomeSection: React.FC<{ onSelectScenario?: (example: string, scenarioKey?: string) => void }> = ({ onSelectScenario }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mx-auto">
            <i className="fas fa-chart-network text-white text-3xl"></i>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">港股市场信息助手</h1>
          <p className="text-gray-600 mb-10 text-sm max-w-2xl">
            我可以帮助你分析股票、了解市场动态、解读宏观趋势。请选择你感兴趣的话题，或直接提问。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {TOPIC_CARDS.map((card: typeof TOPIC_CARDS[number]) => (
              <TopicCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
                example={card.example}
                onClick={() => onSelectScenario?.(card.example, card.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
