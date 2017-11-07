$(document).ready(function(){

var topics = ["Kobe Bryant", "Chauncey Billups", "Kevin Garnett", "Pau Gasol", "Larry Bird", "Magic Johnson", 
 				"Wilt Chamberlain", "Derek Fisher", "Lebron James", "James Worthy", "shaquille o'neal", "Michael Jordan" ]

function setup(){
	$("#add-category-btn").click(function(){
    	topics.push($("#add-category-input").val());
    	$("#toppic-buttons").html("");
    	showTopics();
	});

	showTopics(); 
}

function showTopics(){
	for(var i = 0; i < topics.length; i++){
		$("#toppic-buttons").append("<button class=\"btn-primary\" data-subject=\""+topics[i] + "\">"+topics[i] +"</button> ")
	}

$("#toppic-buttons button").on("click", function(){
	var subject = $(this).attr("data-subject");
	var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=vyr8nSuArRw1N5Ifsl7PGRt78GFhtstR&q=" + subject + "t&limit=10&offset=0&rating=G&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		var results = response.data;
		for (var x = 0; x < results.length; x++){
			var gifDiv = $("<div class='giphs'>");
			var rating = results[x].rating;
			var p = $("<p>").text("Rating: " + rating);
			var animated = results[x].images.fixed_width.url;
			var still = results[x].images.fixed_width_still.url
			window.temp = results; 
			var topicGifs = $("<img class=image-holder>");
			topicGifs.attr("src", animated);
			topicGifs.attr("src", still);
			topicGifs.attr("data-still", still);
			topicGifs.attr("data-animate", animated);
			topicGifs.attr("data-state", "still");
			gifDiv.prepend(p);
			gifDiv.prepend(topicGifs);
			$("#gifs-appear").prepend(gifDiv);
		}
	});

	$(document).on("click", ".image-holder", function(){

        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
	// $(document).on("click",topicGifs, funtion(){
	// 	 var state = $(this).attr("data-state");

	// 	if()
	// }
})

}
setup();


})