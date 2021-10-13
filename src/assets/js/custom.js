$(function () {$("[data-bs-toggle = 'tooltip']").tooltip();});
$(function () {new PerfectScrollbar('#pScrollbar');});
$(function () {new PerfectScrollbar('#pScrollbar2');});
$(function(){
	$(".snav-icobtn-m").on('click',function(){
		if($(this).parents('#pinnedMenu').hasClass('menu-collapsed')){
			$(this).addClass('active');
			$(this).parents('#pinnedMenu').removeClass('menu-collapsed');
			$(this).parents('#pinnedMenu').addClass('menu-expanded');
		} else if($(this).parents('#pinnedMenu').hasClass('menu-expanded')){
			$(this).removeClass('active');
			$(this).parents('#pinnedMenu').removeClass('menu-expanded');
			$(this).parents('#pinnedMenu').addClass('menu-collapsed');
		}
	});
	$(".has-sub").find('a:first').on('click',function(){
	  
		if($(this).parent().hasClass('open')){
		   $(this).parent().removeClass('open');
		}else{
			 $(".has-sub").removeClass('open');
			 $(this).parent().addClass('open');
		}
	});
});
