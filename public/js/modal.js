$( document ).ready(function() {
    
    $("#notes").on("click", function() {
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
            
          }
        );
      });

});