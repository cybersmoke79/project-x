jQuery(function($) {
	var current = location.pathname;
	$('.asaana-nav li a').each(function(){
		var $this = $(this);
		if($this.attr('href') == current){
			$this.addClass('active');
		}
	});

	$(".to-date").datetimepicker({
		format:'d-m-Y H:i',
		minDate : "0"
	});

	$(".from-date").datetimepicker({
		format:'d-m-Y H:i'
	});
});