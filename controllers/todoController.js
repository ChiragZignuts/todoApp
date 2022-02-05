var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://test:test@todoapp.cx5os.mongodb.net/todo?retryWrites=true&w=majority')

var data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Do Coding'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        res.render('todo', {todos : data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item !== req.params.item;
        });
        res.json(data);
    });
}