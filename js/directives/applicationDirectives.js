/**
 * Just put the "scrollable" attribute on a div to make it scrollable
 */
app.directive('scrollable', function() {
	return {
		link: function(scope, elem) {
			elem.mCustomScrollbar({
				scrollInertia: 0,
				advanced:{
					updateOnContentResize: true
				},
				callbacks:{
					onTotalScrollOffset: 200,
					//Load more results on total scroll
					onTotalScroll:function(){
						scope.searchVideos(false);
					}
				}
			});
		}
	};
});

app.directive('userTabs', function () {
    
});
