
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

/* Function converts <input> to <p> after user updates item and presses Enter */
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

var inputtoP = function (item) {
  //console.log($(item).val());
  var newHTML = "<p>" + $(item).val() + "</p>";
  $(item).replaceWith(newHTML);

};


$.ajax({
  method: "PUT",
  url: "/home/janbe30/Documents/learnJS/node-app/todo.json",
  data: { name: "John", location: "Boston" }
})
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });
