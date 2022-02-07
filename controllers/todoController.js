var bodyParser = require('body-parser');
const read = require('body-parser/lib/read');
var mongoose = require('mongoose');

// Connect to the database
var dbURI = 'mongodb+srv://test:test@todoapp.cx5os.mongodb.net/todoApp?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Do Coding'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos : data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from view and add to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
}