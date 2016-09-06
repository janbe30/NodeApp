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
app.get('/todo', function(req, res){ //function to do something with request
  fs.readFile(__dirname + "/" + "todo.json", "utf8", function(err,data){ //function reads todo.json file
    console.log(data)
    res.end(data) //Tells end-point that it's done and sends data back to user
  });
})

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
