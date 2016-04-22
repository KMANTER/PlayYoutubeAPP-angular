var app = angular.module('skmYoutubeBlog',[]);


/**
*	Filter pour convertir les timestamp renvoyer par le youtube server
*/
app.filter('toHHMMSS', [function () {
	return function(value){
		var sec_num = parseInt(value, 10);
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		var time    = hours+':'+minutes+':'+seconds;
		return time;
	}}]);

/**
 * Just put the "scrollable" attribute on a div to make it scrollable
 */
app.directive('scrollable', [function() {
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
}]);

app.controller('MainCtrl',['$scope','$http','$sce', function ($scope,$http,$sce) {

	//si 1 le video va etre lancé automatiquement , 0 si non
	var autoplay = 1;

	//recherche par defaut
	var defaultsearch ='PES 2016';

	//page en cours
	var currentpage = 1;

	//la base de l'url
	var urlBase = 'https://www.googleapis.com/youtube/v3/search?';

	//Youtube API application KEY
	var key = 'AIzaSyA-Vb3CuqUxc7UUMHCu3i6f7gkOD0F2yVo';

	//jeton à utiliser pour demander la page suivante
	var nextPageToken = '';
	//jeton à utiliser pour demander la page précedente
	var prevPageToken = '';


	/* ===================================
		variable accessible à partir du VIEW
	========================================*/

	//la liste des videos trouvés
	$scope.videos=[];

	//playlist
	$scope.playlist=[];

	//video en cours
	$scope.currentVideo ={"id":{"videoId":"vCp5JLnd1Eo"}};
	//$scope.videoId = '';

	/**
	 * construire le lien qui va etre exploité par le iframe
	 * @return {string} - YOUTUBE EMBED video url
	 */
	$scope.getVideoUrl = function () {
		var id = $scope.currentVideo['id'].videoId;
		var url = 'http://www.youtube.com/embed/' + id + '?autoplay=' + autoplay+'&enablejsapi=1&version=3&playerapiid=ytplayer';
		return $sce.trustAsResourceUrl(url);
	};

	/**
	 * Update the current video id
	 * @param  {string} videoId - Youtube video id
	 */
	$scope.playVideo = function (video) {
    autoplay = 1;
    $scope.currentVideo = video;
	};

	$scope.stopVideo = function() {
		$('#player').stopVideo();
	}

	/**
	 * remove video from playlist
	 *
	 */
	 $scope.removefromPlaylist = function(video){
	 	var posVideo = returnObjectFromArray(video , $scope.playlist) ;
	 	if(posVideo != null)
	 		$scope.playlist.splice(posVideo,1);
	 };


	/*
		Get videos from YOUTUBE API
	*/
	$scope.searchVideos = function (isNewSearch) {

		//recuperer la requete saisie par l'utilisateur
		var searchQuery = $scope.searchTerms || defaultsearch;

		//remplacer les espaces par des '+'
		searchQuery = searchQuery.split(' ').join('+');

		//si c'est une nouvelle recherche initialise la page actuelle à 1
		if(isNewSearch){
			currentpage = 1;

			//batir / construire l'url à soumetre à L'API
			var youtube_url = urlBase+'part=snippet&maxResults=15'+ '&q='+ searchQuery +'&type=video&chart=mostPopular&key='+key;
		}
		//si non on increment la page actuelle
		else{
			currentpage++;
			//batir / construire l'url à soumetre à L'API
			var youtube_url = urlBase+'pageToken='+nextPageToken+'&part=snippet&maxResults=15'+ '&q='+ searchQuery +'&type=video&chart=mostPopular&key='+key;
		}

				//Ajax "GET" request
		$http({method: "GET", url: youtube_url})
			.success(function(json) {
				//If it is a new search, replace the old results
				if(isNewSearch){
					$scope.videos = json.items;
				}
				//Else, add the new results at the end of the array
				else{
					$scope.videos.push.apply($scope.videos, json.items);
				}
				//The API tells us if there is more results
				nextPageToken = json.nextPageToken || '';

				prevPageToken = json.prevPageToken || '';

			})
			.error(function (data) {
				console.log("Error", data);
			});


	};

	$scope.addToPlayList = function() {
		if($scope.currentVideo && !containsObject($scope.currentVideo,$scope.playlist))
			$scope.playlist.push($scope.currentVideo);
	}

	$scope.trustAsHtml = function (input) {
		return $sce.trustAsHtml(input);
	};


// fonction privée pour determiner si un object existe déjà dans une liste
	function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
       		}
    	}

    return false;
	}

	function returnObjectFromArray (obj, list) {
	var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return i;
       		}
    	}

    return null;	
	}


}]);
