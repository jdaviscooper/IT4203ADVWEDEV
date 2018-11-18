$(document).ready(function(){
				var url = "https://www.googleapis.com/books/v1/volumes?q=";
				var maxResults = "&maxResults=10&startIndex=";
				$('.bookList').hide();

				$.getJSON("https://www.googleapis.com/books/v1/users/106955433011694532244/bookshelves/0/volumes", function(jsonData){
					var template = $('#bookViewTemplate').html();
					var html = Mustache.render(template,jsonData);
					$('.bookList').html(html);

					$('.bookTemplate').click(function (){
						bookDetailsFunction(jsonData, $(this).attr("id"));
					});
				});

				$("#searchBtn").click(function (){
					searchfunction($(this).attr("resultCount"));
					return false;
				});

				$("#bookshelf").click(function (){
					$(".searchResult").fadeOut();
					$('.bookList').fadeIn();
					$('#bookshelf').css('background-color','#006666');
					$('#bookSearchButton').css('background-color','');

				});

				$("#bookSearchButton").click(function (){
					$(".bookList").fadeOut();
					$('.searchResult').fadeIn();
					$('#bookSearchButton').css('background-color','#006666');
					$('#bookshelf').css('background-color','');

				});

				$(".pageView").on('click', function (){
					searchButton($(this).attr("id"));
					searchfunction($(this).attr("resultCount"));
					return false;
				});

				$('#listButton').on('click', function (){
					listLayout();
				});

				$('#gridButton').click(function (){
					gridLayout();
				});

				function searchfunction(resultCount){
					box = $("#textbox").val();
					$.getJSON(url + box+ maxResults + resultCount, function(jsonData){
						var template = $('#bookViewTemplate').html();
						var html = Mustache.render(template,jsonData);
						$('.searchResult').html(html);

						$('.bookTemplate').click(function (){
							bookDetailsFunction(jsonData, $(this).attr("id"));
						});
					});

					var layout = $('.bookTemplate').attr('dataLayout');
					console.log(layout + "1");
					if (layout != "gridView"){
						listLayout();
						console.log(layout + "2");
					}
					if (layout != "listView") {
						gridLayout();
						console.log(layout + "3");
					}
					return false;
				}

				function bookDetailsFunction (searchResults, bookid){
					var template = $('#bookDetails').html();
					$.each(searchResults.items, function (index,book){
						if (book.id == bookid){
							var html = Mustache.render(template,searchResults.items[index]);
							$('.bookView').html(html);
							$('.bookView').fadeIn();
						}
					});

					$('#buttonHide').on('click',function(){
						$('.bookView').fadeOut();
					});
				}

				function listLayout (){
					$('.bookList').attr('id','listView');
					$('.searchResult').attr('id','listView');
					$('.bookTemplate').css("width", "40%");
					$('.bookTemplate').attr('dataLayout', 'listView');
				}

				function gridLayout (){
					$('.bookList').attr('id','gridView');
					$('.searchResult').attr('id','gridView');
					$('.bookTemplate').css("width", "40%");
					$('.bookTemplate').attr('dataLayout', 'gridView');
				}

				function searchButton (){
						$("#button").css('background-color', '');
				}
			});
