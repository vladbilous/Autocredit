"use strict";
var menu = $("header ul");

$(function() {
	    $("header ul a.in-page").on("click", function (event) {
	    	if (document.title === "Home") {
				event.preventDefault();
				let id  = ($(this).attr('href')).split('/', -1);
				let true_id = id[id.length - 1];
				let	top = $(true_id).offset().top;
				$('body,html').animate({scrollTop: top}, 1000);
			}
    });
	    $("header ul a:not(:eq(0))").click(function() {
        if (menu.data("state") ==="on") show_nav();
	    })
});

function show_nav() {
	if ( menu.data("state") ==="on") {
		$("#cover").animate({
			"height" : "0%",
		}, 500);
		 menu.data("state", "off");
		 $("body").css("overflow-y", "auto");
	} else  {
				$("#cover").animate({
			"height" : "100%",
			}, 500);
		 menu.data("state", "on");
		 $("body").css("overflow-y", "hidden");
		}


	$("header li").each(function(index) {
		if ( index !== 0 ) {
		$(this).fadeToggle(500);
	 } 
	})
}

// RESIZING CONTAINER START
$(window).resize(function() {
		if ( $(window).width() > 780 ) {
			$("header li:not(:eq(0))").css( "display", "inline-block");
		} else $("header li:not(:eq(0))").css( "display", "none");
});
// RESIZING CONTAINER END


