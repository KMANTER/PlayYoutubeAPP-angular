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

app.directive('ngTabs', function () {
    return{
		restrict : 'E',
		scope: {},
		transclude: true,
		templateUrl : 'partials/tabs-tmpl.html',
		controller: function ($scope) {
			$scope.tabs = [];
			this.add = function (tab) {
				if($scope.tabs.length == 0)
					$scope.select(tab);
				$scope.tabs.push(tab);
			}
			$scope.select = function (tab) {
				angular.forEach($scope.tabs, function (t) {
					t.selected = false;
				});
				tab.selected = true;
			}
		}
		
	}
});

app.directive('ngTab', function () {
	return{
		restrict: 'E',
		scope: {title :'@'},
		transclude : true,
		templateUrl: 'partials/tab-tmpl.html',
		require : '^ngTabs',
		link: function (scope, element, attrs, tabsCtrls) {
			tabsCtrls.add(scope);
		}
	}
})
