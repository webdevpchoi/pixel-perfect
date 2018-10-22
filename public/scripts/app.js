$(document).ready(function(){
	//slick.js
	$('.about-info').slick({
		arrows: false,
	});
	//masonry.js
	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
	})
	
	const headers = $('.header-container > h3');

	//change slider depending on the header clicked
	headers.on('click', function switchHeader(e) {
		let slideIndex = $(this).index();
		$('.about-info').slick('slickGoTo', slideIndex);

		if($(this).hasClass('inactive')) {
			$(this).removeClass('inactive');
			$(this).addClass('name-banner');
			$(this).siblings().removeClass('name-banner');			
			$(this).siblings().addClass('inactive');
		}
	})

});