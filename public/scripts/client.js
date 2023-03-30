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
      <i class="fa-solid fa-flag clickable"></i>
      <i class="fa-solid fa-retweet clickable"></i>
      <i class="fa-solid fa-heart clickable"></i>
    </footer>
  </article>`);
};

/** Accepts an array of tweet-data objects.
 *  Pushes dynamically generated tweet article elements
 *  to '.tweets-container'. 
 * 
 * @param {*} "array of tweet-data objects"
 */
const renderTweets = (tweets) => {
  $('.tweets-container').empty();
  for (const tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

/** Fetches tweet data from /tweets with a GET request.
 *  Clears tweet-input form and resets counter.
 *  Calls renderTweets with input to render tweets.
 */
const loadTweets = () => {
  $.get('./tweets/', (data) => {
    // clear tweet input form & reset counter
    $('#tweet-input').val('');
    $('.counter').val(140);

    renderTweets(data);
  });
};

/**
 * Nullifies XSS code.
 * 
 * Examples:
 *  
 *  \`String literal with text input: ${textifyCode(inputString)}\`
 */
const textifyCode = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/** Error message helper function to toggle error
 *  message display in new-tweet element
 *
 *  Examples:
 *  
 *  clear error message: `$toggleErrorMsg()`
 * 
 *  write error message (string): `$toggleErrorMsg(str)`
 */
const $toggleErrorMsg = (message) => {
  const $err = $('.errormessage');
  // Always slide up first
  $err.slideUp();
  // Only slide down 
  if (message) $err.html(message).slideDown();
};

/** Checks tweet length. 
 *  Will toggle error message if tweet is too short (length = 0),
 *  or too long (length > 140). 
 *
 *  Returns true such that tweet can be posted later tweet is 
 *  between 1 and 140 chars.
 */
const checkTweetLength = (message) => {
  if (!message) {
    $toggleErrorMsg("⚠️Empty tweets are for MUMBLERS.⚠️");
  } else if (message.length > 140) {
    $toggleErrorMsg('⚠️Tweets longer than 140 chars are for RAMBLERS.⚠️');
  } else {
    $toggleErrorMsg();
    return true;
  }
}

////////////////////////////
// DOM MANIPULATION CALLS //
////////////////////////////
$(document).ready(function() {

  // Default load-tweet call
  loadTweets();

  /**
   * Listener for posting new tweets
   */
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const $twtText = $(this).children('textarea').val()

    // check tweet length and proceed only if 0 < length <= 140 chars
    if (checkTweetLength($twtText)) {
      const $data = $(this).serialize();

      // posts data and reload tweets
      $.post('./tweets/', $data)
        .then(loadTweets)
        .fail(() => $toggleErrorMsg("Okay, that one was our fault. Maybe."))
    };
  });

  /**
   * Listeners for Write a New Tweet button 
   */

  // Toggle visibility for write new tweet
  $('.new-tweet-toggle').click(() => {
    $('.new-tweet').slideToggle();
    $('#tweet-input').focus();
  });


  $('.new-tweet-toggle').hover(function() {
    $(this).children('i').toggleClass('bounce');
  }); 

  /**
   * Listeners for scroll to top button 
   */

  //Monitor scroll to fade button in/out
  $(window).scroll(function() {
    if($(window).scrollTop() >= 40) {
      $('#to-top-button').fadeIn();
    } else {
      $('#to-top-button').fadeOut();
    }
  });

  // Scroll to top, reveal tweet menu and focus when clicked
  $('#to-top-button').click(() => {
    $(window).scrollTop(0);
    $('.new-tweet').slideDown();
    $('#tweet-input').focus();
  });
});
