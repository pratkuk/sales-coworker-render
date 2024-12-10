'use client';

import { useState, useEffect } from 'react';
import { UserCircle, ListTodo, StickyNote } from 'lucide-react';

const initialTasks = [
  { id: 1, text: 'Follow up with Acme Corp', completed: false },
  { id: 2, text: 'Prepare proposal for TechStart', completed: true },
];

export default function SalesCoworker() {
  // Use null as initial state to indicate not-yet-loaded
  const [tasks, setTasks] = useState<Array<{ id: number; text: string; completed: boolean }> | null>(null);
  const [newTask, setNewTask] = useState('');
  const [note, setNote] = useState('');

  // Initialize data after mount
  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  const addTask = () => {
    if (newTask.trim() && tasks) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    if (!tasks) return;
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Show loading state until client-side data is initialized
  if (tasks === null) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-40 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <UserCircle className="w-12 h-12 text-blue-500" />
          <div>
            <h2 className="text-xl font-bold">Sarah Wilson</h2>
            <p className="text-sm text-gray-500">Enterprise Sales Executive</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Quota: $1.2M / Quarter</p>
          <p>Territory: West Coast</p>
        </div>
      </div>

      {/* Task Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ListTodo className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Tasks</h2>
          </div>
          <div className="flex space-x-2">
            <input 
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task"
              className="px-3 py-2 border rounded-lg w-64"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button 
              onClick={addTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4"
              />
              <span 
                className={task.completed ? 'line-through text-gray-400' : ''}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Notes Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <StickyNote className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Quick Notes</h2>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your notes here..."
          className="w-full h-32 p-2 border rounded-lg resize-none"
        />
      </div>
    </div>
  );
}