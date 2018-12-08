var  gifs= ["cat", "dog", "bumblebee", "john wick"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

  var gifs = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=DlgARiNjbZuoPmlJj33TraziRnIcWsEV&limit=10";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

  });

}

// Function for displaying movie data
function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-gif").empty();
  // Loops through the array of movies
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("btn btn-primary");
    // Added a data-attribute
    a.attr("data-name", gifs[i]);
    // Provided the initial button text
    a.text(gifs[i]);
    // Added the button to the buttons-view div
    $("#buttons-gif").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The movie from the textbox is then added to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".giphy", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();