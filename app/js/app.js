/*global $:false */
'use strict';

//namespace
var MovieApp = MovieApp || {
  url: 'https://bananas-movie-reviews.herokuapp.com'
};

MovieApp.getMovies = function(){
  $.ajax({
    url: MovieApp.url + '/movies',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(data) {
    MovieApp.indexMovies(data);
    // console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrow) {
    console.log(jqXHR, textStatus, errorThrow);
  });
};

MovieApp.indexMovies = function(data){
  console.log(data);
  var templateSource = $("#results_template").html();
  var template = Handlebars.compile(templateSource);
  $(".posts").html(template(data));
};

MovieApp.submitMovie = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: MovieApp.url + '/movies',
    type: 'POST',
    dataType: 'JSON',
    data:{
      movie: {
        title: $('input#movie-title').val(),
        gross: $('input#movie-gross').val(),
        release_date: $('input#movie-release-date').val(),
        mpaa_rating: $('input#movie-mpaa-rating').val(),
        description: $('textarea#movie-description').val()
    } },
  }).done(function(data){
       console.log(data);
  }).fail(function(jqXHR,textStatus,errorThrown){
       console.log("error");
  });
};


$(document).ready(function(){
  MovieApp.getMovies();
  $('form#new-movie-form').on('submit', function(event){
    MovieApp.submitMovie(event);
  });
}); //end document.ready
