import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import Stats from './components/Stats';
import './App.css';

const CATEGORIES = [
  { id: 'personal', label: 'Personal', emoji: '🏠', color: '#7c3aed', bg: '#ede9fe' },
  { id: 'work', label: 'Work', emoji: '💼', color: '#3b82f6', bg: '#dbeafe' },
  { id: 'health', label: 'Health', emoji: '💪', color: '#10b981', bg: '#d1fae5' },
  { id: 'shopping', label: 'Shopping', emoji: '🛒', color: '#f97316', bg: '#ffedd5' },
  { id: 'study', label: 'Study', emoji: '📚', color: '#ec4899', bg: '#fce7f3' },
];

const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#10b981', bg: '#d1fae5', emoji: '🟢' },
  { id: 'medium', label: 'Medium', color: '#f59e0b', bg: '#fef3c7', emoji: '🟡' },
  { id: 'high', label: 'High', color: '#ef4444', bg: '#fee2e2', emoji: '🔴' },
];

const SAMPLE_TODOS = [
  { id: uuidv4(), text: 'Build an awesome React project', category: 'work', priority: 'high', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], completed: false, createdAt: Date.now() },
  { id: uuidv4(), text: 'Go for a morning run 🏃', category: 'health', priority: 'medium', dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], completed: false, createdAt: Date.now() - 1000 },
  { id: uuidv4(), text: 'Buy groceries for the week', category: 'shopping', priority: 'low', dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0], completed: true, createdAt: Date.now() - 2000 },
  { id: uuidv4(), text: 'Read JavaScript: The Good Parts', category: 'study', priority: 'medium', dueDate: '', completed: false, createdAt: Date.now() - 3000 },
];

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow-todos');
      return saved ? JSON.parse(saved) : SAMPLE_TODOS;
    } catch { return SAMPLE_TODOS; }
  });

  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    localStorage.setItem('taskflow-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = { id: uuidv4(), ...todoData, completed: false, createdAt: Date.now() };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (id, updates) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (searchQuery) result = result.filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filter === 'active') result = result.filter(t => !t.completed);
    if (filter === 'completed') result = result.filter(t => t.completed);
    if (categoryFilter !== 'all') result = result.filter(t => t.category === categoryFilter);
    if (priorityFilter !== 'all') result = result.filter(t => t.priority === priorityFilter);

    result.sort((a, b) => {
      if (sortBy === 'createdAt') return b.createdAt - a.createdAt;
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

    return result;
  }, [todos, filter, categoryFilter, priorityFilter, searchQuery, sortBy]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length,
  }), [todos]);

  return (
    <div className="app">
      <div className="app-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="app-content">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} stats={stats} />
        <Stats stats={stats} categories={CATEGORIES} todos={todos} />
        <AddTodo onAdd={addTodo} categories={CATEGORIES} priorities={PRIORITIES} />
        <FilterBar
          filter={filter} setFilter={setFilter}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          categories={CATEGORIES} priorities={PRIORITIES}
          onClearCompleted={clearCompleted}
          completedCount={stats.completed}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          categories={CATEGORIES}
          priorities={PRIORITIES}
        />
      </div>
    </div>
  );
}
