const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Creates instance of Express Router to set up end points
const todoRoutes = express.Router();

const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB Database connection has been established successfully");
})

// Add endpoint to deliver all available todos items
// Function which is passed into the call of the method get is used to handle incoming HTTP GET request on the /todos/ URL path. In this case we’re calling Todos.find to retrieve a list of all todo items from the MongoDB database. Again the call of the find methods takes one argument: a callback function which is executed once the result is available. Here we’re making sure that the results (available in todos) are added in JSON format to the response body by calling res.json(todos).
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// Add endpoint to retrieve a todo item by providing an ID
// Accepting the URL parameter id which can be accessed via req.params.id. This id is passed into the call of Tood.findById to retrieve an issue item based on it’s ID. Once the todo object is available it is attached to the HTTP response in JSON format
// New todo item is part the the HTTP POST request body, so that we’re able to access it view req.body and therewith create a new instance of Todo. This new item is then saved to the database by calling the save method
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// Add route needed to be to add new todo items by sending a HTTP post request (/add)
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'To Do added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new todo failed');
        });
});

// HTTP POST route
// This route is used to update an existing todo item (e.g. setting the todo_completed property to true). Again this path is containing a parameter: id. Inside the callback function which is passed into the call of post, we’re first retrieving the old todo item from the database based on the id. Once the todo item is retrieved we’re setting the todo property values to what’s available in the request body. Finally we need to call todo.save to save the updated object in the database again
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("Data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('To Do updated!');
            })
            .catch(err => {
                res.status(400).send("Update is not possible");
            });
    });
});

// Router added as middleware to take control of requests starting with path /todos
app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
