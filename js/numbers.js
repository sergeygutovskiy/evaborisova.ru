var timeout = 1;
var counters = null;

counters = $('.counter');

counters.each(function () {
	var that = $(this), num = that.html();
	that.html(0);
	
	that.attr('data-num',num);
});


function startCounters()
{
	counters.each(function() {
		var that = $(this);
		if (!that.data('start')) 
		{
			that.attr('data-start', true);
			var i = 1, num = that.data('num'), step = Math.round(1000 * timeout / num),
			int = setInterval(() => {
				if (i <= num) {
					 that.html(i);
				}
				else {
					clearInterval(int);
				}
				i++;
			},step);
		}
	});
}
