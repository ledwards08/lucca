'use strict';

app.controller('HomeCtrl', function ($scope, $rootScope, $location, ZhaoxiangService, $templateCache){
  $templateCache.removeAll();
  var APIs = [];
  $rootScope.availableCameras = [];

  function init(){
    ZhaoxiangService.doActionForAll(function (camera){
      var ctn = document.createElement('div');
      var link = document.createElement('a');
      var span = document.createElement('span');
      var img = document.createElement('img');

      link.href = '#/cam/' + camera.digit;
      link.className = 'camera-list'
      span.textContent = '#' + camera.digit;
      img.id = 'camera-' + camera.digit;

      document.getElementById('cameras').appendChild(ctn)
      ctn.appendChild(link);
      link.appendChild(img);
      ctn.appendChild(span);
    });
  }

  $scope.getStatus = function(){
    if(!$rootScope.isLoading){
      var cameras = ZhaoxiangService.getAllStatus();
      console.log(cameras);
      for (var i = 0; i < cameras.connected.length; i++) {
        document.getElementById('camera-' + cameras.connected[i].digit).parentElement.parentElement.classList.add('is-connected');
      };
      for (var i = 0; i < cameras.notConnected.length; i++) {
        document.getElementById('camera-' + cameras.notConnected[i].digit).parentElement.parentElement.classList.add('is-not-connected');
      };
    }
  }

  $scope.getPreview = function(){
    if(!$rootScope.isLoading){
      ZhaoxiangService.getAllPreviews(function (res, id){
        var domElement = document.getElementById('camera-' + id);
        domElement.parentElement.parentElement.classList.add('has-preview');
        domElement.src = ZhaoxiangService.getCameraAddress(id) + res
      });
    }
  }

  init();
});