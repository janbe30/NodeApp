/* Initial function that grabs data from todo.json file */
$(function(){
  $.getJSON('/home/janbe30/Documents/learnJS/node-app/todo.json', function(data){
    $.each(data, function(i, f){
      $("<p>" + f.id + "</p>").appendTo("#todos #ids");
      $("<p>" + f.title + "</p>").appendTo("#todos #titles").on('click', handleClick);
      $("<p>" + f.description + "</p>").appendTo("#todos #descriptions").on('click', handleClick);
      $("<p>" + f.completed + "</p>").appendTo("#todos #completeds").on('click', handleClick);
    });
  });
});

/* Function that turns each item <p> to <input> when user clicks on it */
var handleClick = function(){
      //console.log($(this).text());
      var html = "<input value='" + $(this).text() + "'>";
      $(this).replaceWith(html);
      listenEnter();
};

var listenEnter = function(){
  $('#todos input').keyup(function (event){
    var currentItem = this;
    //console.log(currentItem);
  if (event.keyCode == '13') {
    event.preventDefault();
      inputtoP(currentItem);
  }
  return false;
  });
};

/* Function converts <input> to <p> after user updates item and presses Enter */
var inputtoP = function (item) {
  //console.log($(item).val());
  var newHTML = "<p>" + $(item).val() + "</p>";
  $(item).replaceWith(newHTML);
  //console.log($(newHTML).text());

  //Make PUT request to server
  var data = $(newHTML).text();
  var request = $.ajax({
      url: "http://localhost:8081/todo/1",
      method: "PUT",
      data: { title: data },
      dataType: "html",
  });

  request.done(function (msg){
    console.log("Success");
  });

  request.fail(function (jqXHR, textStatus){
    console.log("Request failed!!" + textStatus);
  });
};


$('.btn').on('click', function(){
  //Show modal window
  $('#newTodo').show("fast");

});


$('.btn-orange').on('click', function(){
  var newTitle = $('#title-field').val();
  var newDescription = $('#descr-field').val();
  var newStatus = $('#status-field').val();
  var request = $.ajax({
    type: "POST",
    url: "http://localhost:8081/todo",
    data: JSON.stringify({
      id: nextId,
      title: newTitle,
      description: newDescription,
      completed: newStatus
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    hsuccess: function (data, status){
      console.log("Success", status, data);
    }
  });

  request.done(function (msg){
    console.log("Success");
  });

  request.fail(function (jqXHR, textStatus){
    console.log("Request failed!!" + textStatus);
  });
});
