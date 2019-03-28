import React, { Component } from 'react';

// Axios library used for connection to back end
import axios from 'axios';


export default class CreateTodo extends Component {

    /* Setting the initial state of component by assigning an object to this.state, State constitutes the properties defined */
    constructor(props) {
      super(props);

      this.state = {
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
      }

      this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
      this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
      this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    // These methods will update the state properties
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    // Submit event handler of the form to create new To Do item; responsible for sending the data of the new todo element to the back-end
    // Using the axios.post method to send an HTTP POST request to the back-end endpoint http://localhost:4000/todos/add. This endpoint is expecting to get the new todo object in JSON format in the request body. Therefore we need to pass in the newTodo object as a second argument
    onSubmit(e) {
        // Call e.preventDefault to ensure that the default HTML form submit behaviour is prevented
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    // Display the form
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Person Assigned Task:</label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityModerate"
                                    value="Moderate"
                                    checked={this.state.todo_priority==='Moderate'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Moderate</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityCritical"
                                    value="Critical"
                                    checked={this.state.todo_priority==='Critical'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Critical</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create a To Do" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
