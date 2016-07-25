describe('MainCtrlTest', function () {
    beforeEach(module('skmYoutubeBlog'));
    var $controller;
    
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));
    
    describe('addToPlaylist', function(){
           var $scope, $http, $sce, controller, test;
           beforeEach(function(){
             $scope ={};
             $http ={};
             $sce ={};
             controller = $controller('MainCtrl' ,{$scope:$scope, $http:$http ,$sce:$sce});
             spyAddToPlayList = jasmine.createSpy('$scope.addToPlayList');
           });
           
       it('should have a function addtoPlayList', function(){
           expect(typeof $scope.addToPlayList).toEqual('function');
       });
           
       it('add current played video to playlist ', function(){
           var oldSize = $scope.playlist.length;
           $scope.addToPlayList();
           var newSize = $scope.playlist.length;
           expect(newSize).not.toEqual(oldSize);
          
       }); 
       it('track that the spy was called', function(){
            spyAddToPlayList();
            expect(spyAddToPlayList).toHaveBeenCalled();
       });
       it('track that the spy was defined', function(){
          expect(spyAddToPlayList).toBeDefined(); 
       });
       
       

    });
});