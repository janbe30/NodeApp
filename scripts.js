$(function(){
  $.getJSON('/home/janbe30/Documents/learnJS/node-app/todo.json', function(data){
    $.each(data, function(i, f){
      $("<p>" + f.id + "</p>").appendTo("#todos #ids");
      $("<p>" + f.title + "</p>").appendTo("#todos #titles");
      $("<p>" + f.description + "</p>").appendTo("#todos #descriptions");
      $("<p>" + f.completed + "</p>").appendTo("#todos #completeds");
    });
  });
});
