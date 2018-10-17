$(document).ready(function(){
	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
	})
	
	const headers = $('.header-container > h3');
	const aboutInfo = $('.about-info > div');
	console.log(aboutInfo);

	//switch back and forth from one selected header to the other
	headers.on('click', function switchHeader(e) {
		if($(this).hasClass('inactive')) {
			$(this).removeClass('inactive');
			$(this).siblings().addClass('inactive');
		}
	})

});