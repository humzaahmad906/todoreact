import React from 'react';
import logo from './logo.svg';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import OperationClass from './Components/maincomp'
import './App.css';

function App() {
  return (
    <div className="App">
        <h1 className="bg-dark text-light">A basic Todo List App</h1>
      <OperationClass />

    </div>
  );
}

export default App;
