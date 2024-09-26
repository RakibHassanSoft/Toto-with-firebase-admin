import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from './firebase';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log(auth.currentUser)
        const token = await auth.currentUser.getIdToken();
        console.log(token)
        const response = await axios.get('http://localhost:5000/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        'http://localhost:5000/todos',
        { text: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">ToDo List</h1>
      <form onSubmit={handleAddTodo} className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="New ToDo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-gray-300 p-2 flex-grow rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Add</button>
      </form>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo._id} className="flex justify-between items-center p-2 border border-gray-300 rounded-md">
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo._id)} className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition-colors">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => auth.signOut()} className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors">Sign Out</button>
    </div>
  );
};

export default ToDoList;
