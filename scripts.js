$(function(){
  $.getJSON('/home/janbe30/Documents/learnJS/node-app/todo.json', function(data){
    $.each(data, function(i, f){
      $("<p  contenteditable=\"false\">" + f.id + "</p>").appendTo("#todos #ids");
      $("<p contenteditable=\"false\">" + f.title + "</p>").appendTo("#todos #titles");
      $("<p contenteditable=\"false\">" + f.description + "</p>").appendTo("#todos #descriptions");
      $("<p contenteditable=\"false\">" + f.completed + "</p>").appendTo("#todos #completeds");
    });
  });
});


function changeToInput() {
      $('.intro ').click(function () {
          $('.intro').attr("contenteditable", "true");
      });
}
