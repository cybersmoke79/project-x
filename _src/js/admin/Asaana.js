window.asaana = window.asaana || {};

asaana = {
	notify : function( type, message, callback ){
		Swal.fire({
			type: type,
			title: message
		}).then(function(result) {
			if (result.value) {
				if(typeof callback !== 'undefined'){
					callback();
				}
			}
		});
	}
};