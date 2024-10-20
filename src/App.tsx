import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import AchievementModal from './components/AchievementModal';
import { Todo } from './types';
import { CheckCircle, List } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [lastCompletedTask, setLastCompletedTask] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    const completed = todos.filter(todo => todo.completed).length;
    setCompletedTasks(completed);
  }, [todos]);

  const addTodo = (title: string, description: string, importance: 'low' | 'medium' | 'high', image: File | null) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      importance,
      image: image || undefined,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed, completedAt: Date.now() };
        if (updatedTodo.completed) {
          setShowAchievement(true);
          setLastCompletedTask(updatedTodo.title);
        }
        return updatedTodo;
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">我的待办事项</h1>
        <TodoForm onAddTodo={addTodo} />
        <div className="space-y-4 mt-8">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
            />
          ))}
        </div>
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-12 glass-effect p-8">
            <List className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <p className="text-xl">目前没有待办事项。添加一些任务开始你的高效之旅吧！</p>
          </div>
        )}
      </div>
      <AchievementModal
        isOpen={showAchievement}
        onClose={() => setShowAchievement(false)}
        completedTasks={completedTasks}
        lastCompletedTask={lastCompletedTask}
      />
    </div>
  );
}

export default App;