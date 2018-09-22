angular.module('mouseclick',['authService'])

.controller('Onclick',function($scope,Auth,$http,$rootScope){

   // console.log('taesting onclcik');

   var app=this;

   
   


    $scope.count = 0;
    $scope.downvote=0;
    $scope.mouseover=0;
    $scope.favourite=0;
    $scope.copy=0;

    

   this.myFunction=function(){



    $scope.count++;
    localStorage.setItem('upvote',$scope.count);

   };

   this.downvote=function(){
    $scope.downvote++;
    localStorage.setItem('downvote',$scope.downvote);

    //console.log('dd')
   };

  
   
   this.copy=function(){
    $scope.copy++;
    localStorage.setItem('copy',$scope.copy);
   };


   this.mouseover=function(){
    $scope.mouseover++;
    localStorage.setItem('mouseover',$scope.mouseover);
   };

   this.favourite=function(){
    localStorage.setItem('favourite',$scope.favourite);
      if( $scope.favourite==0)
      {
        $scope.favourite=1;
        localStorage.setItem('favourite',$scope.favourite);
      }

   }
  
}); 