$(document).ready(function() {
  // --- our code goes here ---
  const charLimit = 140;

  $("#tweet-input").on("input", function() {
    // calc charleft from length of string @ tweet-text
    const charLeft = charLimit - $(this).val().length;

    // Up to parent, down to 'div' > 'output'
    const $charCount = $(this).parent().children('div').children('output');

    // write remaining char count to counter
    $charCount.val(charLeft);

    // set/remove color class for counter
    (charLeft < 0 ? $charCount.addClass("red") : $charCount.removeClass("red"));
  })
});

