var searchTerm = $('#search-box');
var booksDiv = $('#booksDiv');
var bookDetailsDiv = $('#bookDetailsDiv');
var template = $('#bookListTemplate').html();
var bookDetailsTemplate = $('#bookDetailsTemplate').html();
var queryURL = "https://www.googleapis.com/books/v1/volumes/";
var bookShelfURL = "https://www.googleapis.com/books/v1/users/106955433011694532244/bookshelves/0/volumes";
var bookShelfTemplate = $('#bookShelfTemplate').html();
var myBookshelf = $('#myBookshelf');

function searchBooks(url, param, page){
  $.ajax({url: url + param, method: 'GET'}).done(function(response) {
    if (url === queryURL && param.length > 15) {
      let data = {
        books: response.items
      };
      booksDiv.html(Mustache.render(template, data));
    } else if (url === bookShelfURL) {
      let data = {
        books: response.items
      };
      myBookshelf.html(Mustache.render(bookShelfTemplate, data));
    } else if (url === queryURL && param.length < 15) {
      let data = {
        bookDets: response
      };
      console.log(data);
      bookDetailsDiv.html(Mustache.render(bookDetailsTemplate, data));
    }
  });
  queryURL = "https://www.googleapis.com/books/v1/volumes/";
}

$('.page').on('click', function(event){
  event.preventDefault();
  var page = $(this).attr('data-page');
  var param = '?' + $.param({'q': searchTerm.val(), 'startIndex': page, 'maxResults': 10});
  searchBooks(queryURL, param, page);
});

(function() {
    var param = '';
    searchBooks(bookShelfURL, param);
})();


$(document).on('click', '.book', function() {
  var param = $(this).attr('data-bookid');
  searchBooks(queryURL, param);
  $('#myModal').modal('toggle');
});

$('#list').on('click', function(event){
  event.preventDefault();
  $('.class-to-toggle').attr('class', 'book class-to-toggle col-xs-12');
  $('.bookInformationImg').attr('class', 'bookInformationImg col-xs-3');
  $('.bookInformationTitle').attr('class', 'bookInformationTitle col-xs-9');
});
$('#grid').on('click', function(event){
  event.preventDefault();
  $('.class-to-toggle').attr('class', 'book class-to-toggle col-xs-6');
  $('.bookInformationImg').attr('class', 'bookInformationImg col-xs-12');
  $('.bookInformationTitle').attr('class', 'bookInformationTitle col-xs-12');
});

$('.button').on('click', function(){
  $(".highlight").removeClass("highlight");
  $(this).addClass('highlight');
});

$('.view-option-btn').on('click', function(){
  $(".view-option-btn").removeClass("highlight-view");
  $(this).addClass('highlight-view');
});
