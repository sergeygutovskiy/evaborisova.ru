var curBot = 0;
var scrollable = true;
var stY;

var pageTitles = [
	"",
	"Галерея",
	"Проекты",
	"О нас",
	"Контакты"
];

var pageURIs = [
	"",
	"#gallery",
	"#projects",
	"#about-us",
	"#contacts"
];

var pageStatuses = [
	"viewing-header",
	"viewing-gallery",
	"viewing-about",
	"viewing-contacts"
];

function whenScroll(up = false) 
{
	// change page title
	
	anime({
		targets: '.nav__page-title',
		translateY: 40,
		opacity: 0,
		easing: 'easeInOutExpo',
		duration: 400
	});
	
	setTimeout(() => {
		$(".nav__page-title").text(pageTitles[curBot / 100]);
		
		anime({
			targets: '.nav__page-title',
			translateY: 0,
			opacity: 1,
			easing: 'easeInOutExpo',
			duration: 800
		});	
	}, 400);

	// about page counters
	
	if (pageTitles[curBot / 100] == "О нас")
	{
		setTimeout(startCounters, 600); 
	}

	// change uri
	
	window.location.hash = pageURIs[curBot / 100];

	// change current page for pagination bar
	
	if (up)
	{
		paginationPrev();	
		$("body").removeClass(pageStatuses[curBot / 100 + 1]);
	}
	else
	{
		paginationNext();
		$("body").removeClass(pageStatuses[curBot / 100 - 1]);	
	}

	// change body's page-viewing status
	
	if (window.innerWidth >= mobileWidth || ((window.innerWidth < mobileWidth) && (curBot / 100) != 0) )
		$("body").addClass(pageStatuses[curBot / 100]);

}

$(function() {

	if (window.innerWidth >= mobileWidth)
		$("body").addClass(pageStatuses[0]);

});

function navDown() {
	curBot += 100;

	whenScroll();
	
	scrollable = false;
	$(".backgrounds").css("transform", "translateY(-" + curBot + "%)");
	setTimeout(function() {
		scrollable = true
	}, 1000);

	// if (curBot == 100)
	// {
	//	hidePagination();
	//	$(".body-blur").css("opacity", "1");
	// }
	// else if (curBot == 200)
	// {
	//	showPagination();
	//	
	//	setTimeout(() => {
	//		startCounters();
	//	}, 800);
	// }
}

function navUp() {
	curBot -= 100;

	whenScroll(true);

	scrollable = false;
	$(".backgrounds").css("transform", "translateY(-" + curBot + "%)");
	setTimeout(function() {
		scrollable = true
	}, 1000);

	// if (curBot == 0)
	// {
	//	showPagination();
	//	 $(".body-blur").css("opacity", "0");
	// }
	// else if (curBot == 100)
	// {
	//	$(".body-background").css("transform", "translateY(0)");
	//	hidePagination();
	//	// $(".body-background").css("filter", "blur(8px)");
	// }
}

$(document).on("touchstart", function(event) {
	stY = event.originalEvent.touches[0].screenY;
});

$(document).on("touchmove", function(event) {
	// event.preventDefault();
	var curY = event.originalEvent.touches[0].screenY;
	if (stY - curY > 50 && curBot <= 300 && scrollable)
		navDown();
	else if (curY - stY > 50 && curBot > 0 && scrollable) 
		navUp();
});

$(document).on("keydown", function(event) {
	if (event.keyCode == 40 && curBot <= 300 && scrollable) 
		navDown();
	else if (event.keyCode == 38 && curBot > 0 && scrollable)
		navUp();
});

$(document).on("mousewheel DOMMouseScroll", function(event) {
	// event.preventDefault();
	if ((event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0) && curBot <= 300 && scrollable)
		navDown();
	else if ((event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && curBot > 0 && scrollable)
		navUp();    
});
