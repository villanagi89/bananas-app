/*global $:false */

'use strict';

//namespace
var MovieApp = MovieApp || {
  url: 'http://localhost:3000'
};

MovieApp.getMovies = function(){
  $.ajax({
    url: MovieApp.url + '/movies',
    type: 'GET',
    dataType: 'JSON'
  })
  .done(function(data) {
    MovieApp.indexMovies(data);
    console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrow) {
    console.log(jqXHR, textStatus, errorThrow);
  });
};

MovieApp.indexMovies = function(movies){
  movies.forEach(MovieApp.renderMovie);
};

MovieApp.renderMovie = function(currentVal, index, array){
  console.log(currentVal, index);
  var movie_html = '<li>' + currentVal.title + '</li>';
  $('#show_all').append(movie_html);

};

$(document).ready(function(){
  console.log('hello world');
  MovieApp.getMovies();
});
