$(document).ready(function() {

	$.getJSON('/json/product.json', function(pd) {
		$('#name').html('<h4>' + pd.name + '</h4>');
		$('#price').html('<h4 ><strong> Original Price: ' + pd.price+ '</strong></h4>');
		$('#salePrice').html('<h4 ><strong style="color:red"> Sale Price: ' + pd.discount_price+ '</strong></h4>');
		if (pd.available_colors.length > 0) {
			$('#color').html('<p><strong>Color:</strong></p>');
			$.each(pd.available_colors, function(i, color) {
				$('#color').append('<div class="foo '+ color+ '"></div>');
			});
		}
		else {
			$('#color').html('<h4>Not Avaliable<\h4>');
		}

		if (pd.size.length > 0) {
			$('#size').html('<p><strong>Size:</strong></p>');
			$('#size').append('<p>');
			$.each(pd.size, function(i, size) {
				$('#size').append( ' '+ size + ' ');
			});
			$('#size').append('</p>');
		}
		else {
			$('#size').html('<h4>Not Avaliable<\h4>');
		}
	});

	$('.dropdown-menu a').click(function(){
		$('#selected').text($(this).text());
	});	 

	$(".btn-checkout").on('click', function(){
		$("#ship-addr").css("display", "block");
		$("#order-summary").css("display", "none");
		$(".add-lbl .glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
		$(".order-lbl .glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
	});

	$(".btn-ordersumary").on('click', function(){

		var valid = validateAddress();
		if (valid) {
			$("#ship-addr").css("display", "none");
			$(".add-lbl .glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
			$(".order-lbl .glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
			$("#order-summary").css("display", "block");
			/* $('#selname').html('<p>' + $('#name h4').html() + '</p>');*/
			$('#selorder').html('<p> Order SubTotal: ' + $('#salePrice h4 strong').html() + '</p>');
			$('#selshipping').html('<p> Shipping: $2.00 </p>');
			$('#seltax').html('<p> Tax: </p>');
			$('#seltotal').html('<p> Order Total:        ' +$('#price h4 strong').html() + ' </p>');
			$('#seladdrname').html('');
			$('#seladdr1').html('');
			$('#seladdr2').html('');
			$('#selcity').html('');
			$('#selzip').html('');
		}

	});

	function validateAddress() {
		var email =$('input:text[name=email]').val();
		var fname =$('input:text[name=fname]').val();
		var lname =$('input:text[name=lname]').val();
		var email =$('input:text[name=fname]').val();
		var address1 =$('input:text[name=address1]').val();
		var city =$('input:text[name=city]').val();
		var state =$('input:text[name=state]').val();
		var zipcode =$('input:text[name=zipcode]').val();
		var phonenumber =$('input:text[name=phonenumber]').val();

		if (email.length == 0) {
			alert (" Email is Required Field");
			return false;
		}
		if (fname.length == 0) {
			alert (" First Name is Required Field");
			return false;
		}
		if (lname.length == 0) {
			alert (" Last Name is Required Field");
			return false;
		}
		if (address1.length == 0) {
			alert (" Address1 is Required Field");
			return false;
		}
		if (city.length == 0) {
			alert (" City is Required Field");
			return false;
		}
		if (state.length == 0) {
			alert (" State is Required Field");
			return false;
		}
		if (zipcode.length == 0) {
			alert (" Zip Code is Required Field");
			return false;
		}
		if (zipcode.length != 5) {
			alert (" Please enter valid zipcode");
			return false;
		}
		if (phonenumber.length == 0) {
			alert (" Phone Number is Required Field");
			return false;
		}
		var phfilter = /^[0-9-+]+$/;
		if (!phfilter.test(phonenumber)) {
			alert (" Please enter valid phone number");
			return false;
		}
		return true;
	}

});