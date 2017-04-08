$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        //html version
        // console.log(data)
        $("#articleDisplay").append("<div class='articles'><h6 class='title'>" + data[i].title + "</h6><a class='articleLink' href='" + data[i].link + "'>" + data[i].link + "</a><br/><p class='articleSummary'>" + data[i].summary + "</p><a class=' commentBtn btn-floating btn-small right'><i data-id='" + data[i]._id + "' class='large material-icons'>mode_edit</i></a></div>");


        //handlebars version
    }
});

$(document).on("click", "i.large.material-icons", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        .done(function(data) {
            console.log(data);
            $("#notes").append("<h2>" + data.title + "</h2>");

            //Title Input For Comments
            $("#notes").append("<input id='titleInput' name='title' placeholder='Title'></input>");

            //Body Input For Comments
            $("#notes").append(
                "<textarea id='bodyInput' class='materialize-textarea'></textarea><label for='textarea1'>Comment</label></br>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleInput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyInput").val(data.note.body);
            }
        });
});
