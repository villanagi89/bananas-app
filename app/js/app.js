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

MovieApp.editReview = function(event, movie_id){
  // alert(event.currentTarget.id); //the Edit Review button id: edit-review-b-x,

  //isolate the id of the review when Edit Review button is clicked
  var review_id = event.currentTarget.id.replace('edit-review-b-', '');

// debugger;

  //hide/show the edit review form
  $('#edit-review-b-form-' + review_id).toggle();

  //
  $('form#edit-review-b-form-' + review_id).on('submit',function(event){
    event.preventDefault();

    console.log("The movie id is CURRENTLY: " + movie_id);
    console.log("The review id is CURRENTLY: " + review_id);
    var single_quote = "'"

  $.ajax({
    url: MovieApp.url + '/movies/' + movie_id + '/reviews/' + review_id + single_quote,
    type: 'PATCH',
    dataType: 'JSON',
    data: {
      review: {
        comment: $('#review-comment-field-' + review_id).val(),
        // star_rating: Number($('.rating-input:checked')[0].value),
        // reviewer_name: $('#review-reviewer-name').val()
      }
    }
  }).done(function(data){
    console.log(data)
    //after submitting a new movie: load all movies
    MovieApp.getMovies();
  }).fail();

  });
};


MovieApp.indexMovies = function(data){
  // console.log(data);
  var templateSource = $("#results_template").html();
  var template = Handlebars.compile(templateSource);
  $(".posts").html(template(data));

  //hide all edit review forms on initial load
  $('.edit-review-b-form').hide();

  for (var i = 0; i < data.length; i++){
    MovieApp.addToDropDown(data[i]);
  }

  //edit review
  $(".edit-review").on('click', function(event){
    //get the id of this movie
    var movie_id = $(this).parent().parent().attr("id").replace('movie-', '');
    // alert("This movie id is: " + this_movie_id);

    //call editReview, pass event and movie_id
    MovieApp.editReview(event, movie_id);


  });
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

MovieApp.createReview = function(event){
  event.preventDefault();
  // MovieApp.setupAjaxRequests();
  App.setupAjaxRequests(); //app is your iffe
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

// MovieApp.setupAjaxRequests = function() {
//     var authToken = localStorage.getItem('authToken');
//     $.ajaxPrefilter(function( options ) {
//       options.headers = {};
//       options.headers['AUTHORIZATION'] = "Token token=" + authToken;
//     });
//   };

MovieApp.addToDropDown = function(movie){
  // <option value='1'>First Movie</option>
  var movieHtml = "<option value=" + movie.id + ">" + movie.title + "</option>";
  $("#movie-dropdown").append(movieHtml);
};

$(document).ready(function(){
  MovieApp.getMovies();

  $('form#new-movie-form').on('submit', function(event){
    MovieApp.submitMovie(event);
  });

  $('.submit-btn').on('click', function(event){
    MovieApp.createReview(event);
  });

}); //end document.ready
