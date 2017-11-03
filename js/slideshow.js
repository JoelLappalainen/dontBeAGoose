$(document).ready(function(){

	var allNews = [];
	var i = 0;
	var loop;
	var pause = false;
	$("#play").hide();

	if( allNews.length === 0 && localStorage.news_values && localStorage.news_index){
		allNews = JSON.parse(localStorage.news_values);
		slideNews(localStorage.news_index, JSON.parse(localStorage.news_values));
	}
	else{
		load_news(function (news){
			slideNews(i, news);
		});
	}

	function slideNews( i, data ){

		loop = setInterval(function(){

			var newsimage = new Image();
			newsimage.src = data[i].img_url;
			$("#newsfeed").hide();
			$("#photofeed").html(newsimage);
			$("#photo-name").html(data[i].img_name);
			$("#text-content").html(data[i].img_text);
			$("#newsfeed").fadeIn("slow");

			localStorage.news_index = i;
			i++;

			if(i >= allNews.length){
				i = 0;
			}
		}, 2000);
	}

	function showNews(i , data){

			var newsimage = new Image();
			newsimage.src = data[i].img_url;
			$("#photofeed").html(newsimage);
			$("#photo-name").html(data[i].img_name);
			$("#text-content").html(data[i].img_text);
			localStorage.news_index = i;
			i++;

			if(i >= allNews.length){
				i = 0;
			}
	}

	function load_news( callback ){

		$.getJSON('https://lappalj1.firebaseio.com/.json', function( data ){

			$.each(data, function( i, article ){
				$.each(article, function( j, section){
					allNews.push(section);
				});
			});

			localStorage.news_index = 0;
			localStorage.news_values = JSON.stringify(allNews);
			callback( allNews );
		});

	}

	$('#pause').click(function () {
		$("#pause").hide();
		$("#play").show();
		pause = true;
		clearInterval(loop);
  });

	$('#play').click(function () {
		$("#play").hide();
		$("#pause").show();
		if(pause){
			pause = false;
			if(parseInt(localStorage.news_index) == allNews.length - 1){
				slideNews(0, allNews);
			}
			else{
				slideNews(parseInt(localStorage.news_index) + 1, allNews);
			}
		}
	});

	$('#previous').click(function () {
		if(pause){
			if(parseInt(localStorage.news_index) === 0){
				showNews(allNews.length -1, allNews);
			}
			else{
				showNews(parseInt(localStorage.news_index) - 1, allNews);
			}
		}
		else {
		 	clearInterval(loop);
		 	if (parseInt(localStorage.news_index) === 0) {
		 		showNews(allNews.length - 1, allNews);
		 		slideNews(0, allNews);
		 	}
		 	else {
		 		showNews(parseInt(localStorage.news_index) - 1, allNews);
		 			if (parseInt(localStorage.news_index) === 0) {
		 				slideNews(parseInt(localStorage.news_index) + 1, allNews);
		 			}
		 			else {
		 				slideNews(parseInt(localStorage.news_index) + 1, allNews);
		 			}
 			}
 		}
	});

	$('#next').click(function () {
		if(pause){
			if(parseInt(localStorage.news_index) === allNews.length - 1){
				showNews(0, allNews);
			}
			else{
				showNews(parseInt(localStorage.news_index) + 1, allNews);
			}
		}
		else {
			if (parseInt(localStorage.news_index) === allNews.length - 1) {
				showNews(0, allNews);
				clearInterval(loop);
				slideNews(1, allNews);
			}
		 	else {
				showNews(parseInt(localStorage.news_index) + 1, allNews);
				clearInterval(loop);
				if (parseInt(localStorage.news_index) === allNews.length - 1){
		 			slideNews(0, allNews);
				}
		 		else {
		 			slideNews(parseInt(localStorage.news_index) + 1, allNews);
		 		}
		 	}
		}
	});
});
