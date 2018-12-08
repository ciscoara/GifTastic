//This is my lame array

var  gifs = ["cat", "dog", "bumblebee", "john wick"];

function renderButtons() {


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
};

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The movie from the textbox is then added to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

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

          // Storing the result item's rating
          var rating = imageUrl[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var gifImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          gifImage.attr("src", imageUrl[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(gifImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gif-view").prepend(gifDiv);


    }}
    

});

})
