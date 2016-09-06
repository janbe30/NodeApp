var express = require('express'); //Import packages needed for Node
var bodyParser = require('body-parser');
var fs = require('fs'); //Package that allows us to manage and manipulate files - pretend DB

var app = express(); //Create instance of express server
app.use(bodyParser.json()); //App parses data in file

var server = app.listen(8081, function() {
  var host = server.address().address //Looks at URL and takes address
  var port = server.address().port //and port

  console.log("Example app listening at http://%s:%s", host, port)
})

// GET, POST, PUT/PATCH, DELETE - Basic API commands

//localhost:8081/todo
//Retrieve entire database
app.get('/todo', function(req, res){ //function to do something with request
  fs.readFile(__dirname + "/" + "todo.json", "utf8", function(err,data){ //function reads todo.json file
    console.log(data)
    res.end(data) //Tells end-point that it's done and sends data back to user
  });
})

//Add new item to db
app.post('/todo', function(req, res){
  var newTodo = req.body //Send data in body of req
  var newId = String(newTodo.id); //Var with object in DB's ID
  newTodo["created_at"] = new Date();
  fs.readFile(__dirname + "/" + "todo.json", "utf8", function(err,data){
    data = JSON.parse(data);
    data[newId] = newTodo;
    fs.writeFile(__dirname + "/" + "todo.json", JSON.stringify(data, null, '\t'), "utf8", function(error){ //Write data to file
      if (error) throw error; //Log error in console
      console.log("Saved!");
      res.end(JSON.stringify(data, null, '\t')); //Pass data back to user
    })
  })
})

//Retrieve only one item from database using ID
// localhost:8081/todo/[:id]
app.get('/todo/:id', function(req, res){
  fs.readFile(__dirname + "/" + "todo.json", "utf8", function(err,data){
    todos = JSON.parse(data);
    var todo = todos[String(req.params.id)]//turn id to String and save in var
    console.log(todo);
    res.end(JSON.stringify(todo, null, '\t'));
  })
})

//Update single item : {title, newtitle}
app.put('/todo/:id', function(req, res){
  fs.readFile(__dirname + "/" + "todo.json", "utf8", function(err, data){
    todos = JSON.parse(data); //Parsed data saved to todos
    todos[String(req.params.id)] = Object.assign(todos[String(req.params.id)], req.body); //Update todo with id using object.assign with req.body
    fs.writeFile(__dirname + "/" + "todo.json", JSON.stringify(todos, null, '\t'), "utf8", function(error) {
      if(error) throw error;
      console.log("Updated!");
      res.end(JSON.stringify(todos, null, '\t'));
    })
  })
})

//Delete item
app.delete('/todo/:id', function(req, res){
  fs.readFile(__dirname + "/" + "todo.json", "utf8", function(err, data) {
    data = JSON.parse(data);
    delete data[String(req.params.id)]; //Delete single id
    fs.writeFile(__dirname + "/" + "todo.json", JSON.stringify(data, null, '\t'), "utf8", function(error){
      if(error) throw error;
      console.log('Deleted', data);
      res.end(JSON.stringify(data,null, '\t')); //Return to user
    })
  })
})
