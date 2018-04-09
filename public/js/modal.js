$( document ).ready(function() {
    
    $(".notes").on("click", function() {
        let id = $(this).data("id");
        $.ajax("api/notes/" + id, {
          type: "GET"
        }).then(
          function(data) {
            //CLEAR MODAL
            $(".modal-content").empty();
            //MODAL HEADER
            let headerDiv = $("<div>").addClass("modal-header");
            let headerTitle = $("<h4>").addClass("modal-title").text(data.title);
            let headerBlock = headerDiv.append(headerTitle);
            $(".modal-content").append(headerBlock);
            //MODAL BODY
            let bodyDiv = $("<div>").addClass("modal-body");
            let body;
            if (data.note.length > 0) {
                $.each(data.note, function( i, value ) {
                    let textPanel = $("<div>").addClass("panel panel-body")
                    let text = $("<p>").text(value.note);
                    let textDeleteBtn = $("<button>").addClass("btn float-right btn-danger clearNote").attr("data-id", `${value._id}`).attr("id", value._id).text("X")
                    body = textPanel.append(text).append(textDeleteBtn);
                    bodyDiv.append(body);
                  });
            } else {
                bodyText = bodyDiv.text("No Saved Notes");
            }
            let bodyNewNote = $("<h4>").text("New Note:");
            let bodyForm = $("<textarea>").addClass("form-control").attr("id", "noteText");
            let bodyBlock = bodyDiv.append(bodyNewNote).append(bodyForm);
            $(".modal-content").append(bodyBlock);
            //MODAL FOOTER
            let footerDiv = $("<div>").addClass("modal-footer");
            let footerSaveButton = $("<button>").addClass("btn btn-primary newNote").attr("data-id", `${data._id}`).attr("id", id).text("Save Note");
            let footerBlock = footerDiv.append(footerSaveButton);
            $(".modal-content").append(footerBlock);
          }
        );
      });

    $(document).on("click", ".newNote", function(){
        let id = $(this).attr("id");
        let note = {
            note: $("#noteText").val()
        }
        $.ajax("api/notes/" + id, {
          type: "POST",
          data: note
        }).then(
          function(data) {
            console.log(data);
            location.reload();
          })
    })

    $(document).on("click", ".clearNote", function(){
        let id = $(this).attr("id");
        $.ajax("api/notes/clear/" + id, {
          type: "DELETE",
        }).then(
          function(data) {
            console.log(data);
            location.reload();
          })
    })

});