$.getJSON("/articles", function (data) {
  for (i = 0; i < data.length; i++) {
    $(".articles").append("<p data-id='" + data[i]._id + "'><h4>"
      + data[i].title + "</h4>"
      + data[i].body + "<br /><a target='_blank' href='https://www.nationalgeographic.com.au/" + data[i].link
      + "'><button>See More</button></a><button type='button' class='btn btn-primary btn-sm' data-id='" 
      + data[i]._id + "' id='note'>Add Note</button></p>");
  }
});
//<button type='button' class='btn btn-primary btn-sm' data-id='" + data[i]._id + "' id='saveButt'>Save Me</button>

$.getJSON("/articles", function (data) {
  console.log(data);
  for (i = 0; i < data.length; i++) {
    if (data[i].note) {
      $(".notePage").append("<h4>" + data[i].title + "</h4>" + data[i].body 
      + "<br /><a target='_blank' href='https://www.nationalgeographic.com.au/" + data[i].link
      + "'><button>See More</button></a> <br /> <h5>Notes</h5>" + data[i].note
      + "<br /><button type='button' class='btn btn-primary btn-sm' data-id='"
      + data[i]._id + "' id='delete'>Delete Note</button></p>");
    }
  }
});

  
  $(document).on("click", "#note", function() {
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
  
  $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articlenotes/" + thisId,
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
  