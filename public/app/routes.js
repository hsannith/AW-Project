//console.log('testing routes.js');

angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	//console.log('testing our routes');
   
$routeProvider

.when('/',{

     templateUrl:'app/views/pages/home.html'

})



.when('/about',{

     templateUrl:'app/views/pages/about.html'

})


.when('/register',{
	templateUrl:'app/views/pages/users/register.html',
	controller:'onRegister',
	controllerAs:'register'

})


.when('/login',{

     templateUrl:'app/views/pages/users/login.html'

})


.when('/profile',{


	 templateUrl:'app/views/pages/users/profile.html'	
})

.when('/logout',{


	 templateUrl:'app/views/pages/users/logout.html'	
})


.otherwise({redirectTo:'/'});


        $locationProvider.html5Mode({
				enabled:true,
				requireBase:false
        });


});