$(document).ready(function () {
	$('body').on('submit', 'form.ajax-form', function(e){
		var $form = $(this),
			$action = $form.attr('action'),
			$button = $form.find('button.btn'),
			$btn_txt = $button.text(),
			$data = $form.serialize();
		$button.attr('disabled', 'disabled');
		$form.find(":input").prop("disabled", true);
		$button.html('<div class="spinner-border text-light" role="status"><span class="sr-only">Processing...</span></div>');
		$.post(
			$action,
			$data
		).done( function( response ) {
			$button.removeAttr('disabled');
			$button.html($btn_txt);
			$form.find(":input").prop("disabled", false);
			if ( response.status === true ) {
				if ( typeof response.message !== 'undefined' ) {
					asaana.notify('success',response.message, function(){
						if ( typeof response.redirect !== 'undefined' ) {
							window.location.href= response.redirect;
						}
						if ( typeof response.reload !== 'undefined' ) {
							window.location.reload();
						}
					});
					
				} else {
					asaana.notify('success',response);
				}
			} else {
				if ( typeof response.message !== 'undefined' ) {
					asaana.notify('warning', response.message);
				} else {
					asaana.notify('warning', 'An Error occured');
				}
			}
		}).fail(function(xhr, status, error) {
			$button.removeAttr('disabled');
			$form.find(":input").prop("disabled", false);
			$button.html($btn_txt);
			asaana.notify('danger', 'An Error occured');
		});
		return false;
	});

});