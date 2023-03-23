/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* Temporary hard-coded tweet data for accessing dynamically*/
const data = [
  {
    "user": {
      "name": "Rick",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@theAstley"
    },
    "content": {
      "text": "Never gonna give you up."
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Ricky",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@theAster" },
    "content": {
      "text": "Never gonna let you down."
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Richtly",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@Asterley"
    },
    "content": {
      "text": "Never gonna run around and desert you."
    },
    "created_at": 1461116232227
  }
];

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


$(document).ready(function() {
  /* Call renderTweets on tweet data object*/  
  renderTweets(data);

  /* logic for handling new tweets */
  $('#tweet-form').submit(function(event) {
    const $data = $(this).serialize();
    event.preventDefault();

    // posts data and clears field upon success
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets/',
      data: $data,
      success: () => {$(this).children('textarea').val('')}
    })
  });
});
