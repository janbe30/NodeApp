//Try grabbing the last element in id div instead of adding class
//Use same logic to do updates


var nextId;

/* Initial function that grabs data from todo.json file */
$(function(){
  $.getJSON('/home/janbe30/Documents/learnJS/node-app/todo.json', function(data){
    $.each(data, function(i, f){
      $("<p>" + f.id + "</p>").appendTo("#todos #ids").addClass("lastId");
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

/* Function converts <input> to <p> after user updates item and presses Enter
  Call to server to update item
*/
var inputtoP = function (item) {
  console.log($(item).val());
  var newHTML = "<p>" + $(item).val() + "</p>";
  $(item).replaceWith(newHTML);
  //console.log($(newHTML).text());
  console.log($(newHTML).closest("div").prop("id"); //Getting undefined
  //Make PUT request to server
  var data = $(newHTML).text();
  console.log(data);

  $.ajax({
      type: "PUT",
      url: "http://localhost:8081/todo/1",
      data: JSON.stringify({ title: data }),
      /*
        data: function(){
           if( parent.id == "titles") then JSON.stringify({title:data})
           else if ( parent.id == "descriptions" then JSON.stringify({description: data}))
           else completed: data;
      }
      */
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data, status){
        console.log("Success", status,data);
      }
  });

};

/*Show modal window*/
$('.btn').on('click', function(){
  $('#newTodo').show("fast");
});

/* Function adds new item to list */
$('.btn-orange').on('click', function(){
  //console.log($('.lastId').last().text());
  nextId = parseInt($('.lastId').last().text())+1;
  var newTitle = $('#title-field').val();
  var newDescription = $('#descr-field').val();
  var newStatus = $('#status-field').val();
   $.ajax({
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
    success: function (data, status){
      console.log("Success", status, data);
      location.reload();
      nextId = nextId+1;

    }
  });

});
