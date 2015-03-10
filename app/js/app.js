/*global $:false */
'use strict';

//namespace
var MovieApp = MovieApp || {
  // url: 'https://bananas-movie-reviews.herokuapp.com'
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
  // console.log(data);
  var templateSource = $("#results_template").html();
  var template = Handlebars.compile(templateSource);
  $(".posts").html(template(data));
  for (var i = 0; i < data.length; i++){
    MovieApp.addToDropDown(data[i]);
  }
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
       // console.log(data);

       //after submitting a new movie: load all movies
       MovieApp.getMovies();

       //after submitting a new movie: set fields blank again
        $('input#movie-title').val(''),
        $('input#movie-gross').val(''),
        $('input#movie-release-date').val(''),
        $('input#movie-mpaa-rating').val(''),
        $('textarea#movie-description').val('')

  }).fail(function(jqXHR,textStatus,errorThrown){
       console.log("error");
  });
};

MovieApp.toggleAddReview = function(){
  //initial state of add review form is hidden
  // $("#new-review-form").hide();

  //toggle show/hide on click
  $("#toggle_add_review").click(function(){
    $("#new-review-form").toggle(300);
  });
};

MovieApp.createReview = function(event){
  event.preventDefault();
  App.setupAjaxRequests();
  $.ajax({
    url: MovieApp.url + '/movies/'+ $("#movie-dropdown").val()+'/reviews',
    type: 'POST',
    dataType: 'JSON',
    data: {
      review: {
        comment: $('#review-comment').val(),
        star_rating: Number($('.rating-input:checked')[0].value),
        reviewer_name: $('#review-reviewer-name').val()
      }
    }
  }).done(function(data){
    console.table(data);
  }).fail();
};

MovieApp.addToDropDown = function(movie){
  // <option value='1'>First Movie</option>
  var movieHtml = "<option value=" + movie.id + ">" + movie.title + "</option>";
  $("#movie-dropdown").append(movieHtml);
};

$(document).ready(function(){
  MovieApp.getMovies();

  MovieApp.toggleAddReview();

  $('form#new-movie-form').on('submit', function(event){
    MovieApp.submitMovie(event);
  });
  $('.submit-btn').on('click', function(event){
    MovieApp.createReview(event);
  });
}); //end document.ready
