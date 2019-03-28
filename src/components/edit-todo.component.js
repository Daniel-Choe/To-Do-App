import React, { Component } from 'react';

import axios from 'axios';

export default class EditTodo extends Component {

    // Because we’re accessing the component’s state (this.state) in the event handler method we need to create a lexcial binding to this for all five methods in the constructor
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    // The state object is consisting of four properties which are representing one single todo item. To retrieve the current todo item (based on it’s ID) from the back-end and update the component’s state accordingly the componentDidMount lifecycle method is added
    // Use Axios to send an HTTP GET request to the back-end in order to retrieve todo information. Because we’ve been handing over the ID as a URL parameter we’re able to access this information via this.props.match.params.id so that we’re able to pass on this information to the back-end.
    // The response which is returned from the back-end is the todo item the user has requested to edit. Once the result is available we’re setting the component’s state again with the values from the todo item received
    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // The four onChange event handler methods are making sure that the state of the component is update everytime the user changes the input values of the form controls
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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    // The onSubmit event handler method is creating a new todo object based on the values available in the component’s state and then initiating a post request to the back-end endpoint http://localhost:4000/todos/update/:id to create a new todo item in the MongoDB database
    // By calling this.props.history.push(‘/’) it is also made sure that the user is redirected back to the default route of the application, so that the list of todos is shown again
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    // With the state containing the information of the todo item which has been selected to be edited we’re now ready to output the form, so that the user is able to see what’s available and is also able to use the form to alter data. As always the corresponding JSX code needs to be added to the return statement of the component’s render method
    // Submit event of the form is bound to the onSubmit event handler method of the component
    render() {
        return (
              <div>
                  <h3 align="center">Update To Do</h3>
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
                      <div className="form-check">
                          <input  className="form-check-input"
                                  id="completedCheckbox"
                                  type="checkbox"
                                  name="completedCheckbox"
                                  onChange={this.onChangeTodoCompleted}
                                  checked={this.state.todo_completed}
                                  value={this.state.todo_completed}
                                  />
                          <label className="form-check-label" htmlFor="completedCheckbox">
                              Completed
                          </label>
                      </div>

                      <br />

                      <div className="form-group">
                          <input type="submit" value="Update Todo" className="btn btn-primary" />
                      </div>
                  </form>
              </div>
        )
    }
}
