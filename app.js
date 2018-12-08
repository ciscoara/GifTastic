//This is my lame array

var  gifs = ["cat", "dog", "bumblebee", "john wick", "batman", "flops"];


function renderButtons(){

  $("#buttons-gif").empty();

  for (var i = 0; i < gifs.length; i++) {

    var a = $("<button>");

    a.addClass("btn btn-primary");
    // Added a data-attribute
    a.attr("data-name", gifs[i]);
    // Provided the initial button text
    a.text(gifs[i]);
    // Added the button to the buttons-view div
    $("#buttons-gif").append(a);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  gifs.push(gif);

  renderButtons();
});

renderButtons();

    $("#buttons-gif").on("click", "button", function(response){
        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DlgARiNjbZuoPmlJj33TraziRnIcWsEV&q=" + gif +"&limit=10";
      
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .then(function(response) {
          console.log(response);
          var imageUrl = response.data;
      
          for (var i = 0; i < imageUrl.length; i++) {
    
            // Only taking action if the photo has an appropriate rating
            if (imageUrl[i].rating === "g") {
              // Creating a div for the gif
              var gifDiv = $("<div>");
              gifDiv.addClass("gifDiv");
    
              // Storing the result item's rating
              var rating = imageUrl[i].rating;
             var title = imageUrl[i].title;
    
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);
              var p1 = $("<p>").text("Title: " + title);
    
              // Creating an image tag
              var gifImage = $("<img>");
              gifImage.attr("src", imageUrl[i].images.fixed_height_still.url);
              gifImage.attr("data-state", "still");
              gifImage.attr("data-still", imageUrl[i].images.fixed_height_still.url);
              gifImage.addClass("play");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              gifImage.attr("data-animate", imageUrl[i].images.fixed_height.url);
    
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(p1);
              gifDiv.append(gifImage);
    
              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gif-view").prepend(gifDiv);
    
    
        }};
      })
        $(document).on("click",".play", function (){
          var state = $(this).attr("data-state");

          if (state === "still"){

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        })

        
    
    })


