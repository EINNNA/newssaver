$.getJSON("/articles", function (data) {
  for (i = 0; i < data.length; i++) {
    $(".articles").append("<p data-id='" + data[i]._id + "'><h4>"
      + data[i].title + "</h4>"
      + data[i].body + "<br /><a target='_blank' href='https://www.nationalgeographic.com.au/" + data[i].link
      + "'><button>See More</button></a><button type='button' class='btn btn-primary btn-sm' data-id='"
      + data[i]._id + "' id='savebutton'>Save Me</button><button type='button' class='btn btn-primary btn-sm' data-id='"
      + data[i]._id + "' id='note'>See/Add Note</button></p>");
  }
});

$(document).on("click", "#savebutton", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function (data) {
    $(".saved").append("<p data-id='" + data._id + "class='" + data._id + "'>"
      + data.title + "<a target='_blank' href='https://www.nationalgeographic.com.au/" + data.link
      + "'><button type='button' class='btn btn-primary btn-sm'>See More</button></a><button type='button' class='btn btn-primary btn-sm' data-id='"
      + data._id + "' id='unsave'>Unsave</button></p>"
    );
  });
});

$(document).on("click", "#unsave", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function (data) {
    $(this).remove();
  });
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
        $(".notes").append("<button data-id='" + data.note._id + "' id='deletenote'>Delete Note</button>");
  
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  $(document).on("click", "#deletenote", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/notes/" + thisId
    }).then(function(){
      location.reload();
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


    + "<p><u>Note</u></p>"
    + "<b>" +  (data[i].note ? data[i].note.title : '') + "</b>"
    + "<p>" +  (data[i].note ? data[i].note.body : '') + "</p>"

  });