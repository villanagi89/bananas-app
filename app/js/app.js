'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.square = function(x){
  return x * x
};

App.cube = function(x){
  return x * x * x
};

App.greet = function(string){
  return string = typeof string !== 'undefined' ? 'Hello ' + string : "Hello World";
};

App.toggleAddReview = function(){
  //initial state of add review form is hidden
  $("#new-review-form").hide();

  //toggle show/hide on click
  $("#toggle_add_review").click(function(){
    $("#new-review-form").toggle(300);
  });
};

$(document).ready(function(){
  trace('hello world');

  App.toggleAddReview();

});
