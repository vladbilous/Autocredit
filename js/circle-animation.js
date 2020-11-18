"use strict"

// Circle-1
$('.circle-1').circleProgress({
    value: 0.75,
    fill: {
      color: "#F7CA3C"
    }
});


$('.circle-1').on('circle-animation-progress', function(event, progress) {
    $(this).find('span.number').html(Math.round(88000 * progress) + '</br><i>грн</i>');
});

// Circle-2
$('.circle-2').circleProgress({
    value: 0.75,
    fill: {
      color: "#F7CA3C"
    }
});


$('.circle-2').on('circle-animation-progress', function(event, progress) {
    $(this).find('span.number').html(Math.round(40000 * progress) + '</br><i>грн</i>');
});
