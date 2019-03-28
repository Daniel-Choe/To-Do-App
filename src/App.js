import React, { Component } from 'react';
import './App.css';
import logo from './todolist.jpg';

// Bootstrap connection
import "bootstrap/dist/css/bootstrap.min.css";

// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

/// Import components
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
           <h2>A To-Do List Application Created Using MERN Stack</h2>
           <br />
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="http://daniel-choe.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="daniel-choe.com" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack To Do App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">To Do List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create a To Do</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <br />
        {/* Router Configuration - Each new route needs a new Route element */}
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </Router>
    );
  }
}

export default App;
