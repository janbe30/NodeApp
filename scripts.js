/*Global variables */
var currentId, nextId;
var parentDiv, index;
var currentItem;

/* Initial function that grabs data from todo.json file */
$(function(){
  $.getJSON('/home/janbe30/Documents/learnJS/node-app/todo.json', function(data){
    $.each(data, function(i, f){
      $("<p id=" + f.id + ">" + f.id + "</p>").appendTo("#todos #ids").addClass("lastId");
      $("<p>" + f.title + "</p>").appendTo("#todos #titles");
      $("<p>" + f.description + "</p>").appendTo("#todos #descriptions");
      $("<p>" + f.completed + "</p>").appendTo("#todos #completeds");
      currentId = f.id;
    });
  });
});


/* Function turns each item <p> to <input> when user clicks on it */
$('#todos').on('click', 'p', function(){  /* To make a click event work on dynamic elem, call the event on static parent tag first */
  var html = "<input value='" + $(this).text() + "'>";
  parentDiv = $(this).parent().attr('id');
  index = $(this).index();

  $(this).replaceWith(html);
  listenEnter();


  /* If click on any of the titles, show delete btn and call delete function on click. */
  if(parentDiv == "titles"){
    // .position() uses position relative to the offset parent,
    // so it supports position: relative parent elements
    var pos = $(this).position();
    console.log(pos);

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();
    console.log(width);

    //show the menu directly over the placeholder
    $("#deleteBtn").css({
        position: "absolute",
        top: 50 + pos.top + "em",
        left: (9 + pos.left - width) + "em"
    }).show();

    $("#deleteBtn").click(function(){
      deleteItem(index);
    });
  }

  /* If parentDiv == titles, show button to delete
    'x' button should be dynamic. it would only appear to the left of active titles
    ONClick call to delete from server and remove from page
  */
});

/* Function converts <input> to <p> after user updates item and presses Enter
  Call to server to update item
  ---- Would be good to check if 'updated text' is equal to 'old text', if it is then skip the call to server -----
*/
var listenEnter = function(){
  $('#todos input').keyup(function (event){
    var currentItem = this;
    var oldText = currentItem;
    index = $(currentItem).index();
    currentId = index;

    var myUrl = "http://localhost:8081/todo/" + currentId;
    //console.log(currentItem);
    if (event.keyCode == '13') {
      event.preventDefault();
      $(function(){
        //console.log($(item).val());
        console.log($(oldText).val());

        var newHTML = "<p>" + $(currentItem).val() + "</p>";
        console.log($(newHTML).text());
        $(currentItem).replaceWith(newHTML);


        /*If new text == old text, return
        if($(oldText).val() === $(newHTML).text()){
          return;
        }*/

        //Make PUT request to server
        var data = $(newHTML).text();

        var updatedItem = new Object;
        if(parentDiv == "titles"){
          updatedItem.title = data;
        }
        if(parentDiv == "descriptions"){
          updatedItem.description = data;
        }
        if(parentDiv == "completeds"){
          updatedItem.completed = data;
        }

        $.ajax({
            type: "PUT",
            url: myUrl,
            data: JSON.stringify(updatedItem),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status){
              console.log("Success", status,data);
            }
        });

      });
    }
  return false;
  });
};


/*
var inputtoP = function (item) {
  //console.log($(item).val());
  var newHTML = "<p>" + $(item).val() + "</p>";
  $(item).replaceWith(newHTML);
  //console.log($(this).text());
  console.log($(this).parent().attr("id"));
  console.log($(this).closest("div").prop("id"));
//  console.log($(newHTML).closest("div").prop("id"); //Getting undefined
  //Make PUT request to server
  var data = $(newHTML).text();
  console.log(data);

  $.ajax({
      type: "PUT",
      url: "http://localhost:8081/todo/:id",
      data: JSON.stringify({ title: data }),

        data: function(){
           if( parent.id == "titles") then JSON.stringify({title:data})
           else if ( parent.id == "descriptions" then JSON.stringify({description: data}))
           else completed: data;
      }

      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data, status){
        console.log("Success", status,data);
        //reload window so we can get to update again. probably not the best practice
      }
  });

};*/


/* Function deletes item from json file */
var deleteItem = function(index){
  currentId = index;
  var myUrl = "http://localhost:8081/todo/" + currentId;

  $.ajax({
    type: "DELETE",
    url: myUrl,
    success: function(data, status){
      console.log("Success", status);
      location.reload();
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
