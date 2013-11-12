/*
 * ScrollNavigation
 * Simple navigation highlighter on scroll.
 * Author: Ã†var Eggertsson - aevar@eggertsson.org
 */
(function($, undefined){

	var _settings = {
			sections: '#content section', // containers
			throttle: 250, // ms to throttle the function
			margin: 50, // px
			activeClass: 'selected'
		},
		// We want to use jQuery throttle if possible
		_throttle = $.throttle || function( minWait, fun){
			var scrollTimer,
				that,
				throttle = function(){
					if (!scrollTimer) {
						that = this,
						args = arguments,
						scrollTimer = setTimeout(function() {
							scrollTimer = null;
							fun.apply(that, args);
						}, minWait);
					};
				};
				
			return throttle;
		},
		_calculatePositions = function(cfg){
			var items = [];
			$(cfg.sections).each(function(i, el){
				var $el = $(el),
					top,
					name = $el.attr('id');
				if(name){ //If there is no id set, we dont care about it
					top = parseInt($(el).position().top) - cfg.margin;
					items.push({ top: top, name: name })
				}
			});
			//We push one to the end to find 'inbetween' last
			items.push({ top: 999999, name: 'END' });
			
			return items;
		};
	
	$.fn.ScrollNavigation = function(options){
			var $nav = this,
				cfg = $.extend({}, _settings, options),
				sections = [],
				$win = $(window),
				onScroll,
				i, length = 0,
				findSections = function(){
					sections = _calculatePositions(cfg);
					length = sections.length -1;
				};
			
			//Find all sections now and on resize
			findSections();
			$(window).resize(findSections);
			
			onScroll = function(e){
				var top = $win.scrollTop(),
					$current;
				for(i = 0; i < length; i++){
					if(sections[i].top <= top && sections[i+1].top > top){
						$current = $nav.filter('[href=#'+ sections[i].name +']');
						if($current.length === 1 && !$current.hasClass(cfg.activeClass)){
							$nav.removeClass(cfg.activeClass);
							$current.addClass(cfg.activeClass);
						}
						break;
					}
				}
			};
			
			$(window).scroll(_throttle(cfg.throttle, onScroll)).trigger('scroll');
		}
}(jQuery));
