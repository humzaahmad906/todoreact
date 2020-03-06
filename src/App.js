import React from 'react';
import logo from './logo.svg';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './Components/maincomp'
import './App.css';

function App() {
  return (
    <div className="App">
        <h1 className="bg-dark text-light">A basic Todo List App</h1>
      <TodoList />

    </div>
  );
}

export default App;
