import React from 'react';
import { Trophy, Star } from 'lucide-react';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedTasks: number;
  lastCompletedTask: string;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ isOpen, onClose, completedTasks, lastCompletedTask }) => {
  if (!isOpen) return null;

  const achievements = [
    { count: 1, message: "太棒了！你完成了第一个任务！", icon: "🎉" },
    { count: 5, message: "哇！你已经完成了5个任务，继续保持！", icon: "🌟" },
    { count: 10, message: "惊人的进步！10个任务已完成，你是最棒的！", icon: "🚀" },
    { count: 25, message: "25个任务！你的毅力令人钦佩！", icon: "💪" },
    { count: 50, message: "50个任务！你是任务完成的大师！", icon: "🏆" },
    { count: 100, message: "100个任务！你简直是超人！", icon: "🦸" },
  ];

  const currentAchievement = achievements.findLast(a => completedTasks >= a.count);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full glass-effect">
        <div className="text-6xl mb-4">{currentAchievement?.icon || "🎊"}</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">恭喜你！</h2>
        <p className="text-xl mb-4 text-gray-700">{currentAchievement?.message || "你完成了一个新任务！"}</p>
        <p className="text-lg mb-2 text-gray-600">刚刚完成的任务：</p>
        <p className="text-xl font-semibold mb-4 bg-yellow-100 p-2 rounded-lg">{lastCompletedTask}</p>
        <div className="flex justify-center items-center mb-6">
          <Trophy className="text-yellow-400 w-8 h-8 mr-2" />
          <p className="text-2xl font-bold text-gray-800">已完成任务总数：{completedTasks}</p>
        </div>
        <div className="flex justify-center space-x-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-8 h-8 ${i < Math.min(completedTasks, 5) ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors"
        >
          继续努力！
        </button>
      </div>
    </div>
  );
};

export default AchievementModal;