/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/** This function will generate a tweet article element
 *  using a standard tweet-data object.
 *
 * @param {*} "tweet-data object"
 * @returns "tweet article element"
 */
const createTweetElement = (tweet) => {
  return $(`
  <article class="tweet">
    <header>
      <img src="${tweet.user.avatars}" alt="User icon">
      <div>${textifyCode(tweet.user.name)}</div>
      <div class="handle">${textifyCode(tweet.user.handle)}</div>
    </header>
    <p class="text">${textifyCode(tweet.content.text)}</p>
    <footer>
      <div class="date"> ${timeago.format(tweet.created_at)}</div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
  </article>`);
};

/** This function accepts an array of tweet-data objects,
 *  calls createTweetElement on each tweet-data object,
 *  then appends the tweet article to the index.html container.
 *
 * @param {*} "array of tweet-data objects"
 */
const renderTweets = (tweets) => {
  $('.tweets-container').empty();
  for (const tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

/* logic for GETTING saved tweets */
const loadTweets = () => {
  $.get('./tweets/', (data) => {
    // clear tweet input form & reset counter
    $('#tweet-input').val('');
    $('.counter').val(140);
    renderTweets(data);
  })
};

/** This function nullifies XSS
 */
const textifyCode = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

////////////////////////////
// DOM MANIPULATION CALLS //
////////////////////////////
$(document).ready(function() {

  /* logic for POSTING new tweets */
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const $twtText = $(this).children('textarea').val()
    
    // catch empty tweets
    if (!$twtText) {return alert('You have not written anything!')};

    if ($twtText.length > 140) {
      return alert(`Your tweet is ${$twtText.length - 140} characters too long!`);
    };

    const $data = $(this).serialize();

    // posts data and reload tweets
    $.post('./tweets/', $data)
      .then(loadTweets)
      .fail(() => alert("Failed to send tweet!"))
  });

  loadTweets();
});
