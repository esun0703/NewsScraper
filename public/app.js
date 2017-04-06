$.getJSON("/articles", function(data){
	for (var i = 0; i<data.length; i++){
		//html version
		// console.log(data)
		$("#articleDisplay").append("<div class='articles'><h6 class='title'>" + data[i].title + "</h6><a class='articleLink' href='" + data[i].link +"'>" + data[i].link + "</a><br/><p class='articleSummary'>" + data[i].summary + "</p><a class='btn-floating btn-small right' data-id='" + data[i]._id +"'><i class='large material-icons'>mode_edit</i></a></div>");
		

		//handlebars version
	}
});

$(document).on("click", "a.btn-floating", function() {
	$("#notes").empty();
	var thisId = $(this).attr("data-id");
	$.ajax({
		method:"GET",
		url:"/articles/" + thisId
	})
	.done(function(data){
		console.log(data);
		// $("#notes").append()
	});
});