// $(document).ready(function() {
//
// var flickerApi = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
//   $.getJSON( flickerApi, {
//     tags: "retro vespa",
//     tagmode: "any",
//     format: "json"
//   })
//
// .done(function(vespa_pics){
// 	// var flickrImage = new Image();
// 	console.log(vespa_pics)
//
// 	$.each(vespa_pics.items, function(i, object){
// 		if(i < 4){
// 			$("<img>").attr("src", object.media.m).addClass("col-xs-6 col-xs-offset-0 col-sm-3 col-sm-offset-0").appendTo($("#flickr-photos"));
// 			i++;
// 		}
// 	});
// 	// flickrImage.src = vespa_pics["items"][0].media.
// 	// $("#flickr-photos").append(flickerImage);
//
//
//   });
// });
// //.media.m
