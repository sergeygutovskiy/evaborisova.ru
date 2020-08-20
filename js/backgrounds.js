var curBot = 0;

$(function() {
	var scrollable = true;

	function navDown() {
		curBot += 100;

		paginationNext();

		scrollable = false;
		$(".backgrounds").css("transform", "translateY(-" + curBot + "%)");
		setTimeout(function() {
			scrollable = true
		}, 1000);

		if (curBot == 100)
		{
			hidePagination();
			$(".body-blur").css("opacity", "1");
		}
		else if (curBot == 200)
		{
			showPagination();
			// $(".body-background").css("filter", "blur(0)");
		}
	}

	function navUp() {
		curBot -= 100;

		paginationPrev();

		scrollable = false;
		$(".backgrounds").css("transform", "translateY(-" + curBot + "%)");
		setTimeout(function() {
			scrollable = true
		}, 1000);

		if (curBot == 0)
		{
			showPagination();
			 $(".body-blur").css("opacity", "0");
		}
		else if (curBot == 100)
		{
			$(".body-background").css("transform", "translateY(0)");
			hidePagination();
			// $(".body-background").css("filter", "blur(8px)");
		}
	}
	var stY;

	$(document).on("touchstart", function(event) {
		stY = event.originalEvent.touches[0].screenY;
	})

	$(document).on("touchmove", function(event) {
		// event.preventDefault();
		var curY = event.originalEvent.touches[0].screenY;
		if (stY - curY > 50 && curBot <= 300 && scrollable)
			navDown();
		else if (curY - stY > 50 && curBot > 0 && scrollable) 
			navUp();
	})

	$(document).on("keydown", function(event) {
		if (event.keyCode == 40 && curBot <= 300 && scrollable) 
			navDown();
		else if (event.keyCode == 38 && curBot > 0 && scrollable)
			navUp();
	})

	$(document).on("mousewheel DOMMouseScroll", function(event) {
		// event.preventDefault();
		if ((event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0) && curBot <= 300 && scrollable)
			navDown();
		else if ((event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) && curBot > 0 && scrollable)
			navUp();    
	})

})
