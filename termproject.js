$(document).ready(function(){
			 var api = 'https://api.themoviedb.org/3';
                var multisearch = '/search/multi';
                var apikey = '?api_key=3f92931c9b59c49cb8e746a5ce287c2c';
                var num = 1;
                var pageNum = "&page=" + num;
                var loading = false;

						
				$("#searchId").click(function(){
					$(".searchContent").css("display","block");
					$(".topRated").fadeOut();
					$(".discoverControls").css("display","none");
					$(".upcoming").fadeOut();
					$(".popular").fadeOut();
					$(".inTheater").fadeOut();
					$(".movieSearch").fadeIn();
					activeButton("button1");
					$(".navBarSearchControls").css("display","block");
				});
				
				$("#upcomingMovieId").click(function(){
					$(".searchContent").css("display","none");
					$(".topRated").fadeOut();
					$(".navBarSearchControls").css("display","none");
					$(".movieSearch").fadeOut();
					$(".popular").fadeOut();
					$(".inTheater").fadeOut();
					$(".discoverControls").css("display","block");
					$(".upcoming").fadeIn();
					activeButton("button1");
					upcomingMoviesFunction("1");
				});
				
				$("#topRatedId").click(function(){
					$(".searchContent").css("display","none");
					$(".navBarSearchControls").css("display","none");
					$(".movieSearch").fadeOut();
					$(".popular").fadeOut();
					$(".inTheater").fadeOut();
					$(".discoverControls").css("display","block");
					$(".upcoming").fadeOut();
					$(".topRated").fadeIn();
					activeButton("button1");
					topRatedFunction("1");
				});
				
				$("#inTheaterId").click(function(){
					$(".searchContent").css("display","none");
					$(".topRated").fadeOut();
					$(".navBarSearchControls").css("display","none");
					$(".popular").fadeOut();
					$(".upcoming").fadeOut();
					$(".movieSearch").fadeOut();
					$(".discoverControls").css("display","block");
					$(".inTheater").fadeIn();
					activeButton("button1");
					inTheaterFunction("1");
				});
				
				$("#popularId").click(function(){
					$("#button1").css("background-color","#666666");
					$("#button1").css("cursor","auto");
					$(".searchContent").css("display","none");
					$(".topRated").fadeOut();
					$(".navBarSearchControls").css("display","none");
					$(".upcoming").fadeOut();
					$(".movieSearch").fadeOut();
					$(".inTheater").fadeOut();
					$(".discoverControls").css("display","block");
					$(".popular").fadeIn();
					activeButton("button1");
					popularFunction("1");
				});
							
				$("#searchButton").click(function (){
					searchfunction($(this).attr("resultCount"));
					return false;
				});
							
				
				$(".pageView").on('click', function (){
					activeButton($(this).attr("id"));
					
					var layout = $('.movieView').attr('dataLayout');
					if (layout != "grid"){
						listLayout();
					}
					if (layout != "list") {
						gridLayout();
					}
					
					
					if ($(".movieSearch").is(':visible')){
					
						searchfunction($(this).attr("resultCount"));
						
					}
					if ($(".upcoming").is(':visible')){
						upcomingMoviesFunction($(this).attr("resultCount"));
						
					}
					if ($(".inTheater").is(':visible')) {
						inTheaterFunction($(this).attr("resultCount"));
						
					}
					
					if ($(".popular").is(':visible')) {
						popularFunction($(this).attr("resultCount"));
						
					}
					if ($(".topRated").is(':visible')){
						topRatedFunction($(this).attr("resultCount"));
						
					}
					
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
					$.getJSON(searchURL + box + "&page=" + resultCount, function(jsonData){
						var template = $('#defualtMovieView').html();
						var html = Mustache.render(template,jsonData);
						$('.movieSearch').html(html);
						
						$('.showDetails').click(function (){
							showDetailsFunction($(this).attr("movieId"));
						}); 
						
						var layout = $('.movieView').attr('dataLayout');
						if (layout != "grid"){
							listLayout();
						}
						if (layout != "list") {
							gridLayout();
						}
					});
					return false;
				}
				
				function upcomingMoviesFunction (resultCount){
					$.getJSON(domain + "movie/upcoming"+api + "&language=en-US&page=" + resultCount, function(jsonData){
						var template = $('#defualtMovieView').html();
						var html = Mustache.render(template,jsonData);
						$('.upcoming').html(html);
						
						$('.showDetails').click(function (){
							showDetailsFunction($(this).attr("movieId"));		
						}); 
					});
				}
				
				function inTheaterFunction (resultCount){
					$.getJSON(domain + "movie/now_playing" + api + "&language=en-US&page=" + resultCount, function(jsonData){
						var template = $('#defualtMovieView').html();
						var html = Mustache.render(template,jsonData);
						$('.inTheater').html(html);
						
						$('.showDetails').click(function (){
							showDetailsFunction($(this).attr("movieId"));		
						});
					});
				}
				
				function popularFunction (resultCount){
					console.log(resultCount);
					$.getJSON(domain+ "movie/popular" + api + "&language=en-US&page=" + resultCount, function(jsonData){
						var template = $('#defualtMovieView').html();
						var html = Mustache.render(template,jsonData);
						$('.popular').html(html);
						
						$('.showDetails').click(function (){
							showDetailsFunction($(this).attr("movieId"));		
						}); 
					});
				}
				
				function topRatedFunction (resultCount){
					$.getJSON(domain+ "movie/top_rated" + api + "&language=en-US&page=" + resultCount, function(jsonData){
						var template = $('#defualtMovieView').html();
						var html = Mustache.render(template,jsonData);
						$('.topRated').html(html);
						
						$('.showDetails').click(function (){
							showDetailsFunction($(this).attr("movieId"));		
						}); 
					});
				}
				
				function showDetailsFunction (movieid){
					$('body').css('overflow','hidden');
					var template = $('#MovieDetails').html();
					$.getJSON(domain + "movie/" + movieid + api, function(jsonData){
						var template = $('#MovieDetails').html();
						var html = Mustache.render(template,jsonData);			
						$('.movieDetailsPage').html(html);
						$('.movieDetailsPage').fadeIn();
						
						$('.actorsName').click(function(){
							actorsInformationFunction($(this).attr("personid"));
						});
						
						$('.detailsPage').on('click',function(){
							$('body').css('overflow','');
							$('.movieDetailsPage').fadeOut(500);
						});
					});	
					
					var id = movieid;
					castInformationFunction(id);
					reviewBoxFunction(id);					
				}
				
			
				function castInformationFunction (movieid){
					var template = $('#CastDetails').html();
					$.getJSON(domain + "movie/" + movieid + "/credits" + api, function(jsonData){
						var template = $('#CastDetails').html();
						var html = Mustache.render(template,jsonData);			
						$('.castBox').html(html);
					});
				}
				
				function reviewBoxFunction(movieid){
					var template = $('#ReviewDetails').html();
					$.getJSON(domain + "movie/" + movieid + "/reviews" + api, function(jsonData){
						var template = $('#ReviewDetails').html();
						var html = Mustache.render(template,jsonData);			
						$('.reviewBox').html(html);
					});
				}
				
			function listLayout (){
					$('.movieSearch').attr('id','listView');
					$('.movieView').css("width", "100%");
					$('.movieView').attr('dataLayout', 'list');
				}
							
				function gridLayout (){
					$('.movieSearch').attr('id','gridView');
					$('.movieView').css("width", "40%");
					$('.movieView').attr('dataLayout', 'grid');
				}
				
				function activeButton (){
						$("#button").css('background-color', '');	
				}
				
			});