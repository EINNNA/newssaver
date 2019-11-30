$.getJSON("/articles", function (data) {
  for (i = 0; i < data.length; i++) {
    $(".articles").append("<p data-id='" + data[i]._id + "'><h4>"
      + data[i].title + "</h4>"
      + data[i].body + "<br /><a target='_blank' href='https://www.nationalgeographic.com.au/" + data[i].link
      + "'><button>See More</button></a><button type='button' class='btn btn-primary btn-sm' id='note'>Add Note</button></p>");
  }
});
//<button type='button' class='btn btn-primary btn-sm' id='saveButt'>Save Me</button>

/*$(document).ready(function() {
  $.ajax({
    method: "DELETE",
    url: "/saved/delete/"
  }).then(function(dbSaved){
    res.json(dbSaved);
  });
});*/
  
  $(document).on("click", "p", function() {
    $(".notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $(".notes").append("<h2>" + data.title + "</h2>");
        $(".notes").append("<input id='titleinput' name='title' >");
        $(".notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $(".notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  $(document).on("click", "#saveButt"/, function() {
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    }).then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  