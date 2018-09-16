//console.log('testing app.js');

angular.module('signinApp',['appRoutes','userControllers','mainControl','authService'])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptors');
});