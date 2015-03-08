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
    // console.log(data);
  }).fail(function(jqXHR, textStatus, errorThrow) {
    console.log(jqXHR, textStatus, errorThrow);
  });
};

MovieApp.indexMovies = function(data){
  // movies.forEach(MovieApp.renderMovie);
  console.log(data);
  var templateSource = $("#results_template").html();
  var template = Handlebars.compile(templateSource);
  $(".posts").html(template(data));
};

// MovieApp.renderMovie = function(currentVal, index, array){
//   console.log(currentVal, index);
//   var movie_html = '<li>' + currentVal.title + '</li>';
//   $('#show_all').append(movie_html);

// };

$(document).ready(function(){
  console.log('hello world');
  MovieApp.getMovies();
});
