/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  /** This function will generate a Tweet article element
   *  using a standard tweet-data object.
   * 
   * @param {*} tweet 
   * @returns 
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
  }

  // Test to see if a tweet article is returned
  // Arbitrarily mapped to the navbar right double-down icon.
  $('.fa-angles-down').on('click', ()=> {
    console.log('Tweet Article:', createTweetElement(tweetData));
    console.log('HTML Text:', createTweetElement(tweetData).html())
  })
});