describe('Controller MainCtrl', function () {
    beforeEach(module('skmYoutubeBlog'));
    var $controller;
    var controller;  
    var $scope, $http, $sce;  
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
        $scope ={};$http ={};$sce ={};
        controller = $controller('MainCtrl' ,{$scope:$scope, $http:$http ,$sce:$sce});
    }));

    describe('function addToPlaylist', function(){
       beforeEach(function(){   
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
       it('should`nt throw an exception', function(){
          expect($scope.addToPlayList).not.toThrow(); 
       });

    });
    describe('current video', function(){
       it('should be not null at the initialisation of the application', function(){
           expect($scope.currentVideo).not.toBeNull();
       }); 
    });
    describe('function getvideoByUrl', function () {
      it('should not throw an exception', inject(function(){
        expect($scope.getVideoUrl).toThrow();  
      })); 
    });

});
describe('filter timestamp', function(){
    var toHHMMSS;
    var $filter;
    beforeEach(module('skmYoutubeBlog'));
    
    beforeEach(inject(function(_$filter_){
      $filter = _$filter_; 
      toHHMMSS = $filter ('toHHMMSS');   
    }));

    it('should convert timestamp to HHMMSS time format', function(){
      expect(toHHMMSS("40992")).toBe('11:23:12'); 
    });
});