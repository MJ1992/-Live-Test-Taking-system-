var sideBar = document.getElementById('sidebar'); 
var mainContent   = document.getElementById('main-content'); 

var icon  = document.getElementById('menu-toggle');
icon.addEventListener('click',function(e){

	
	sideBar.classList.toggle('closed');
	sideBar.classList.toggle('open');

	mainContent.classList.toggle('content');
	mainContent.classList.toggle('content-b');
	e.stopPropagation();
});

$(window).resize(function(){
    
    var width = $(window).width();
    if(width >= 200 && width <= 600){
        $('#sidebar').removeClass('open').addClass('closed');
        $('#main-content').removeClass('content').addClass('content-b');
	
	
    }
    
 })
 .resize();



 