var link, linkx, number, menu, menux;

$(document).ready(function () {
	$('.scrspy').addClass('affix');

	if ($("#headerSize").length) {
		var element = document.getElementById('headerSize');
		$(".affix").affix({
			offset: {
				top: element.offsetHeight
			}
		});
	}

	// Sets nav for the right width on open because the nav is not part of
	// the document flow, the position being set to "fixed", so it needs to resize.
	// Once on load and then again every time the window resizes.
	$(window).resize(function(){
	  //resizeNavInner();
	})

	function resizeNavInner() {
		var winWidth = $('section').width();
		$('.navbar-fixed-top .horizontal-nav').width(winWidth);
	};

	resizeNavInner();


	//modals
	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog");
		var offset = ($(window).height() - $dialog.height()) / 2;
		// Center modal vertically in window
		$dialog.css("margin-top", offset);
	}

	$('.modal').on('show.bs.modal', centerModal);
	$(window).on("resize", function () {
		$('.modal:visible').each(centerModal);
	});


	//tooltips
	$('body').tooltip({
		selector: '[data-toggle=tooltip]',
		container: 'body'
	});



	//Megamenu
	var link, linkx, before, after, link_before, link_after, number, menu, menux, menu_before, menu_after;

	//Dropdown
	$('#drop-menus >').hide();
	$('.drop-tag')
		.mouseover(function() {								//mouseover link
			link = this.id;
			number = link.charAt(9);

			before = Number(number) - 1;
			after = Number(number) + 1;

			linkx = "#" + link;
			link_before = "#drop-link" + before;
			link_after = "#drop-link" + after;

			menu = "#drop-menu";
			menux = menu + number;
			menu_before = "#drop-menu" + before;
			menu_after = "#drop-menu" + after;

			$(menux).show();

			$('#drop-menus > div').not(menux).hide();
		})
		.mouseout(function() {
			$('.drop-navbar').hover(					//still moused over navbar anywhere
				function() {
					$(menux).hover(										//mouseover menu
						function() {
							$(menux).show();
						},
						function() {
							$(menux).hide();
						}
					);
				},
				function() {								//mouseoff nav bar
					$('#drop-menus >').hide();					//hide all menus
				}
			);

		});


	//Accordion

	$('#menus >').hide();
	$('.tag')
		.mouseover(function() {								//mouseover link
			link = this.id;
			number = link.charAt(4);

			before = Number(number) - 1;
			after = Number(number) + 1;

			linkx = "#" + link;
			link_before = "#link" + before;
			link_after = "#link" + after;

			menu = "#menu";
			menux = menu + number;
			menu_before = "#menu" + before;
			menu_after = "#menu" + after;

			$(menux).show();

			$('#menus > div').not(menux).hide();
		})
		.mouseout(function() {								//mouseoff link
			$('#navbar').hover(
														//still moused over navbar anywhere
				function() {
					$(menux).hover(										//mouseover menu
						function() { $(menux).show(); });				//keep the menu up

				}, function() {								//mouseoff nav bar
					$('#menus >').hide();					//hide all menus
				}
			);
		});


// dtna-accordion

	$(document).ready(function() {
	  $('.dtna-accordion-head').each(function(){
		$(this).attr('data-toggle','collapse');
		var idVar = $(this).data('target');
		idVar = idVar.substring(1);
		$(this).next('div').attr('id',idVar).addClass('collapse');
		if($(this).hasClass('expanded')){
		  $(this).next('div').addClass('in');
		}
	  });

	  $('.dtna-accordion-head').on('click',function(){
		if($(this).hasClass('expanded')){
		  $(this).removeClass('expanded');
		} else {
		  $(this).addClass('expanded');
		}
	  });
	});

// scrollspy starts here

	$('body').scrollspy({target: '#myScrollspy'})

	$('#myScrollspy').find('ul ul li').addClass('hide'); // This is what is causing everythning to hide on page load

	$('#myScrollspy').on('activate.bs.scrollspy', function() {

		/*active and non active variables*/
		var act_ele = $(this).find('li.active');
		var act_sub_ele = $(this).find('ul ul li.active');

		var non_act_eles = $(this).find('li').not('.active');
		var non_act_sub_eles = $(this).find('ul ul li').not('.active');


		/*hide all sub elements right away*/
		act_sub_ele.addClass('hide');
		non_act_sub_eles.addClass('hide');


		/*are there any sub elements of the active element?*/
		if (act_ele.find('ul').length>0) {

			/*First hide everything*/
			non_act_sub_eles.addClass('hide');

			/*unhide all of the children of active class, but hide sub children right away*/
			act_ele.find('li').removeClass('hide');
			$('ul ul li ul li').addClass('hide');



			/*are there any sub sub elements of the active element?*/
			if(act_sub_ele.find('ul').length>0) {

				/*unhide the sub sub children*/
				act_sub_ele.find('ul li').removeClass('hide');
			}
		}
	});

	// code to show the values of the range sliders in the form elements section.
	$('#range_display_constrained').html('0');
	$('#toast_level_constrained').on("change mousemove",function(){
		var range_var = $(this).val();
		$('#range_display_constrained').html(range_var);
	});

	$('#range_display_unconstrained').html('0');
	$('#toast_level_unconstrained').on("change mousemove",function(){
		var range_var = $(this).val();
		$('#range_display_unconstrained').html(range_var);
	});


	// R2L Custom code
	$('#about_link').click(function(e){
		e.preventDefault();
		window.location.href = "about.html";
	});

	$('.view_more_button.media').click(function(e){
		e.preventDefault();
		window.location.href = "media.html";
	});

	// play and pause featured video.
	$('.media_featured_intro_image, .media_featured').click(function(e){
		e.preventDefault();
		stopVideos();  // pauses all videos on page and resets thumbnail
		$('.media_featured').show();
		$('.media_featured').removeClass('hide');
		$('.media_featured_intro_image').hide();

		if(!$(this).hasClass("playing")){
			$('.media_featured')[0].play();
			$('.media_featured').addClass('playing').removeClass('paused');
		} else {
			$('.media_featured')[0].pause();
			$(this).addClass('paused').removeClass('playing');
		};
	});

	$('.media_item').click(function(e){
		$('.media_featured_intro_image').show();
		$('.media_featured').hide();
		$('.media_featured')[0].pause();
		stopVideos();

		$(this).find('img').removeClass('show').addClass('hide');
		$(this).find('video').removeClass('hide').addClass('show playing');
		$(this).find('video')[0].play();
	});

});

