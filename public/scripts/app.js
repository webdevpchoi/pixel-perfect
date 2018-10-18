$(document).ready(function(){
	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
	})
	
	const headers = $('.header-container > h3');
	const aboutInfo = $('.about-info > div');

	//switch back and forth from one selected header to the other
	headers.on('click', function switchHeader(e) {
		if($(this).hasClass('inactive')) {
			$(this).removeClass('inactive');
			// $(this).siblings().addClass('inactive');
			aboutInfo[1].classList.add('slideInLeft');
			aboutInfo[1].classList.remove('inactive');						
			aboutInfo[0].classList.add('slideOutLeft');
		}
	})

});