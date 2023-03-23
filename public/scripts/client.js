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
  const $tweet = $(`
  <article class="tweet">
    <header>
      <img src="${tweet.user.avatars}" alt="User icon">
      <div>${tweet.user.name}</div>
      <div class="handle">${tweet.user.handle}</div>
    </header>
    <p class="text">${tweet.content.text}</p>
    <footer>
      <div class="date"> ${tweet.created_at}</div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
  </article>`);

  return $tweet;
};

/** This function accepts an array of tweet-data objects,
 *  calls createTweetElement on each tweet-data object,
 *  then appends the tweet article to the index.html container.
 *
 * @param {*} "array of tweet-data objects"
 */
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('.tweets-container').append(createTweetElement(tweet));
  }
};


////////////////////////////
// DOM MANIPULATION CALLS //
////////////////////////////
$(document).ready(function() {

  /* logic for POSTING new tweets */
  $('#tweet-form').submit(function(event) {
    const $data = $(this).serialize();
    event.preventDefault();

    // posts data and clears field upon success
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets/',
      data: $data,
    })
      .done(() => $(this).children('textarea').val(''))
      .fail(() => alert("Failed to send tweet!"))
  });

  /* logic for GETTING saved tweets */
  $.get('http://localhost:8080/tweets/', (data) => renderTweets(data));
});
