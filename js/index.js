$(document).ready(function() {

  //Twitter widget from https://dev.twitter.com/web/javascript/loading
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
  // End of twitter widget

  // Default "Quote" that appears on page load
  $("#displayQuote").html("<p><b>Click the orange button for a new quote!</b><br><span " +
    "class='pull-right'><em>~Chad Kreutzer</em></span></p>");
  // put API URL in a variable for ease of reading
  var forismaticAPI = "http://api.forismatic.com/api/1.0/?method=getQuote&" +
    "format=jsonp&lang=en&jsonp=callback=?";

  $("#generateQuote").on("click", function() {

    //set new background image
    $('body').css('background-image', 'url(/images/' + randomPicture() + '.jpg)');

    //get and set new quote
    $.getJSON(forismaticAPI, function(json) {

      if (json.quoteAuthor === '') {
        json.quoteAuthor = "unknown";
      }

      $("#displayQuote").html("<p><b>" + json.quoteText +
        "</b><br><span class='pull-right'><em>~" +
        json.quoteAuthor + "</em></span></p>");

      var tweetText = json.quoteText + " ~" + json.quoteAuthor;
      tweetText = tweetText.replace(/\s+/g, "+").replace(";", "%3B");
      $(".tweetIntent").attr("href", "https://twitter.com/intent/tweet?text=" +
        tweetText);

    });

  });

  function randomPicture() {
    var pictureList = [
      "berries", "cushion", "ducks", "flower", "geese", "glass", "grate",
      "light", "meter", "produce", "rocks", "round", "snow", "sunset", "water"
    ];

    return pictureList[Math.floor(Math.random() * pictureList.length)];
  }
});