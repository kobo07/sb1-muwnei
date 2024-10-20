import React from 'react';
import { Todo } from '../types';
import { Star, CheckCircle, Circle, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  const importanceColor = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <div className={`glass-effect p-6 rounded-lg shadow-md ${todo.completed ? 'border-l-4 border-green-500' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-xl font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.title}</h3>
        <div className="flex items-center space-x-2">
          <Star className={`${importanceColor[todo.importance]}`} />
          {todo.completed ? (
            <CheckCircle
              className="text-green-500 cursor-pointer hover:text-green-600 transition-colors"
              onClick={() => onToggleComplete(todo.id)}
            />
          ) : (
            <Circle
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              onClick={() => onToggleComplete(todo.id)}
            />
          )}
        </div>
      </div>
      {todo.description && <p className="text-gray-600 mb-3">{todo.description}</p>}
      {todo.image && (
        <img src={URL.createObjectURL(todo.image)} alt="任务图片" className="w-full h-48 object-cover rounded-md mb-3" />
      )}
      {todo.imageUrl && (
        <img src={todo.imageUrl} alt="任务图片" className="w-full h-48 object-cover rounded-md mb-3" />
      )}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-500">
          创建于: {new Date(todo.createdAt).toLocaleString()}
        </span>
        <Trash2
          className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;