function circle_animation() {

  $('.circle-1').circleProgress({
    value: 0.75,
    animation: true,
    fill: {gradient: ['#00a99d', '#00a99d']},
    emptyFill: "#e4e4e4",
    thickness: "4.5",
    size: 120,
    animation: { duration: 2000}
  }).
  });


    $('.circle-2').circleProgress({
    value: 0.92,
    animation: true,
    fill: {gradient: ['#00a99d', '#00a99d']},
    emptyFill: "#e4e4e4",
    thickness: "4.5",
    size: 120,
    animation: { duration: 2000}
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(92 * progress) + '<i>%</i>');
  });
};

$(function() {
  circle_animation();
})


// function isVisible(tag) {
//     let t = $(tag);
//     let w = $(window);
//     let wt = w.scrollTop();
//     let tt = t.offset().top;
//     let tb = tt + t.height();
//     return ((tb <= wt + w.height()) && (tt >= wt));
// }

// $(function () {
//     $(window).scroll(function () {
//         let b = $("#our_powerful_skills");
//         if (!b.prop("shown") && isVisible(b)) {
//             b.prop("shown", true);
//             circle_animation();
//         }
//     });
// });
