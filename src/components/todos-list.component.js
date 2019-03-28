import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

// Todo component is implemented as a functional React component. It outputs the table row which contains the values of the properties of the todo item passed into that component. Inside the Actions column of the table we’re also outputting a link to /edit/:id route by using the Link component
export default class TodosList extends Component {

    // Initialize the state with an empty to dos array
    constructor(props) {
      super(props);
      this.state = {todos: []};
    }

    // Use componentDidMount to retrieve the to dos data from the database
    // Use the axios.get method to access the /todos endpoint. Once the result becomes available we’re assigning response.data to the todos property of the component’s state object by using the this.setState method
    componentDidMount() {
    axios.get('http://localhost:4000/todos/')
        .then(response => {
            this.setState({ todos: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    // Inside this method we’re iterating through the list of todo items by using the map function. Each todo item is output by using the Todo component which is not yet implemented. The current todo item is assigned to the todo property of this component
    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    // Output is done as a table and inside the tbody element we’re making use of the todoList method to output a table row for each todo item. Because of that we need to add the implementation of todoList method to TodosList component as well
    render() {
        return (
          <div>
             <h3>Todos List</h3>
             <table className="table table-striped" style={{ marginTop: 20 }} >
                 <thead>
                     <tr>
                         <th>Description</th>
                         <th>Responsible</th>
                         <th>Priority</th>
                         <th>Action</th>
                     </tr>
                 </thead>
                 <tbody>
                     { this.todoList() }
                 </tbody>
             </table>
         </div>
        )
    }
}
