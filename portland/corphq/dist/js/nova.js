$(document).ready(function() {
	var currentPage = getCurrentPage();
	var currentPageName = '';
	if(currentPage === "") {
		currentPage = "index.html";
		currentPageName = "New Building Home";
	}
	// alert(currentPage);

	// resetAllImages();

	testLocalStorage(currentPage,currentPageName);
	// populateLastFiveMenu();
	// setMenu();

	setInitialText();
	// setInitialMenuInteractions();
	resetLists()

	replaceRelatedWithMapIcon();
	prependRelatedWithMapIcon();

	resetBreadcrumbRootToHome();

	$(".bigIconCaption").on("mouseover",function(e){
		e.preventDefault();
	});

	setFooterStyle();
	hideEmptyHeros();
	
	$(".clickShareScreenShare img").removeClass("normalImage");
	$(".inlineInstructionalImageNatural").removeClass("normalImage");


  $('.conference-room-table-container #conference-room-table').DataTable({

	"colReorder": {
			"order": [ 0, 3, 4, 2, 5, 1 ]
	},
	'paging': false,
	// 'columnDefs': [
	//   { 'type': 'num', 'targets': 3 } // now defined using html5 data element on table thead th elements
	// ],
	'oLanguage': {
	  'sSearch': 'Filter:'
	}
  });

  // $('#conference-room-table_filter').parent().prepend('<h2 class="tableH2"> Conference Rooms </h2>');
	$("#conference-room-table tr td:nth-child(n+5),#conference-room-table tr th:nth-child(n+5)").hide();
	$("#conference-room-table tr td:nth-child(1),#conference-room-table tr th:nth-child(1)").css("width","15%");
	$("#conference-room-table tr td:nth-child(2),#conference-room-table tr th:nth-child(2)").css("width","10%");
	$("#conference-room-table tr td:nth-child(3),#conference-room-table tr th:nth-child(3)").css("width","60%");
	$("#conference-room-table tr td:nth-child(4),#conference-room-table tr th:nth-child(4)").css("width","15%");
});

function pageLoad(sender, args) {
	// resetAllImages();
	resetLists()
}

function resetAllImages(){
 $(".textPageContentArea img").each(function(){
 	$(this).removeAttr("style");
 	$(this).addClass('normalImage');
 	if($(this).hasClass("imageThumbnail")){
 		$(this).removeClass("normalImage")
 	}
 	// should be OR in above statement when you get time to test.
 	if($(this).hasClass("linkIcon")){
 		$(this).removeClass("normalImage");
 		$(this).css("width","14px");
 	}
 });

 $(".textPageMoreLinksContent ul").addClass("list-unstyled");
};

function resetLists(){
 $(".textPageMoreLinksContent ul").addClass("list-unstyled");
};

function populateLastFiveMenu () {
	var lastFiveMenu = "";
	var retrievedObject = localStorage.getItem('userObject');
	retrievedObject = JSON.parse(retrievedObject);
	for (var i = 0; i <= retrievedObject.lastPages.length - 1; i++) {
		lastFiveMenu = lastFiveMenu + "<option value='" + retrievedObject.lastPages[i][0] + "'>" + retrievedObject.lastPages[i][1] + "</option>";
	}
	console.log(lastFiveMenu);
	$('.lastFive').html(lastFiveMenu);
}

function testLocalStorage (currentPage,currentPageName) {
	if(localStorage.getItem('userObject') === null) {
		var userObject = {
			'startDate': 1451742617870,
			'lastPages': [
			]
		};
		var pageName = '';
		pageName = $('title').text();
		var lastPageNew = [currentPage,pageName];
		userObject.startDate = Date.now();
		userObject.lastPages.unshift(lastPageNew);
		localStorage.setItem('userObject', JSON.stringify(userObject));
	} else {
		var retrievedObject = localStorage.getItem('userObject');
		var testRetreivedObject = [];
		retrievedObject = JSON.parse(retrievedObject);
		console.log("object",retrievedObject);
		for (var i = retrievedObject.lastPages.length - 1; i >= 0; i--) {
			testRetreivedObject.push(retrievedObject.lastPages[i][0]);
		}
		if(!isInArray(currentPage,testRetreivedObject)){
			var lastPageNew = [currentPage,$('title').text()];
			retrievedObject.lastPages.unshift(lastPageNew);
			if(retrievedObject.lastPages.length >= 6){
				retrievedObject.lastPages.splice(-1,1);
				console.log(retrievedObject.lastPages);
			}
		}
		localStorage.setItem('userObject', JSON.stringify(retrievedObject));
	}
}

function getCurrentPage() {
	var fileName = location.pathname.split("/").slice(-1);
	fileName = fileName[0];
	return fileName;
}

function setMenu() {
	$('.lastFive').on('change',function(){
		window.location = $(this).val();
	});
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function setInitialText(){
	if($(".textPageMoreLinksContent").html() === ""){
		$(".textPageMoreLinks").hide();
		$(".textPageMoreLinksIndicator").hide();
	}

}

function setInitialMenuInteractions(){
	$(".menuMeetings").on("click",function(){
		window.location="/conference-spaces/"
	});

	$(".menuAbout").on("click",function(){
		window.location="/about/"
	});

	$(".menuWorkspaces").on("click",function(){
		window.location="/workspaces/"
	});

	$(".menuTransportation").on("click",function(){
		window.location="/parking-and-transit/"
	});
}

function replaceRelatedWithMapIcon(){
	var mapIcon = "<a href=\"https://goo.gl/maps/fsAfBqc29Dn\" target=\"_blank\"><img src=\"/media/1096/map_icon.gif\" alt=\"Related Topics\" title=\"map\"></a>";
	$(".inlinePageAddressBox").parent().parent().parent().find(".textPageMoreLinksIndicator").css("display","block").html(mapIcon);
}

function prependRelatedWithMapIcon(){
	var mapIcon = "<a href=\"https://goo.gl/maps/fsAfBqc29Dn\" target=\"_blank\" class=\"mapIconPreLink\"><img src=\"/media/1096/map_icon.gif\" alt=\"Related Topics\" title=\"map\"></a>";
	$(".appendMapIcon").parent().parent().parent().find(".textPageMoreLinksIndicator").css("display","block").prepend(mapIcon);
}

function resetBreadcrumbRootToHome(){
	$("ul.breadcrumb a").each(function(){
		if($(this).html() === "CorpHQ"){
			$(this).html("Home");
		}
	});
}

function setFooterStyle(){
	if($( document ).height() <= window.innerHeight){
		$("footer").addClass("navbar-fixed-bottom")
	}
}

function hideEmptyHeros(){
	var heroEmpty = $(".firstPageContent").find(".textPageContentArea").each(function(){
		if($(this).text() === ""){
			$(".firstPageContent").hide();
		}
	});
}


/* for the transit page */
$('.open-google-transit-map').on('click', function(event) {
  window.open('https://goo.gl/maps/fsAfBqc29Dn', '_blank');
});


// Custom sort algorithms for datatables on the conference room page
$.fn.dataTableExt.oSort['capactity-asc']  = function(a, b) {
  if (!$.isNumeric(a) && !$.isNumeric(b)) {
    return 0;
  }
  if (!$.isNumeric(a)) {
    return -1;
  }
  if (!$.isNumeric(b)) {
    return 1;
  }
  a = Number(a);
  b = Number(b);
  return ((a < b) ?  -1 : ((a > b) ? 1 : 0));
};
$.fn.dataTableExt.oSort['capactity-desc']  = function(a, b) {
  if (!$.isNumeric(a) && !$.isNumeric(b)) {
    return 0;
  }
  if (!$.isNumeric(a)) {
    return 1;
  }
  if (!$.isNumeric(b)) {
    return -1;
  }
  a = Number(a);
  b = Number(b);
  return ((a < b) ?  1 : ((a > b) ? -1 : 0));
};
$.fn.dataTableExt.oSort['roomsign-asc']  = function(a, b) {
  if (!$.isNumeric(a) && !$.isNumeric(b)) {
    return ((a < b) ?  -1 : ((a > b) ? 1 : 0));
  }
  if (!$.isNumeric(a)) {
    return -1;
  }
  if (!$.isNumeric(b)) {
    return 1;
  }
  a = Number(a);
  b = Number(b);
  return ((a < b) ?  -1 : ((a > b) ? 1 : 0));
};
$.fn.dataTableExt.oSort['roomsign-desc']  = function(a, b) {
  if (!$.isNumeric(a) && !$.isNumeric(b)) {
    return ((a < b) ?  1 : ((a > b) ? -1 : 0));
  }
  if (!$.isNumeric(a)) {
    return 1;
  }
  if (!$.isNumeric(b)) {
    return -1;
  }
  a = Number(a);
  b = Number(b);
  return ((a < b) ?  1 : ((a > b) ? -1 : 0));
};