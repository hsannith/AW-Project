

angular.module('authService',[])

.factory('Auth',function($http,authToken){

  //onsole.log('testing auth services');
	var authFactory={};

	authFactory.login=function(logindata){
		return $http.post('/api/authenticate',logindata).then(function(data){
				//console.log(data);
				authToken.setToken(data.data.token);
			return data;
		});
	};
		//Auth.isLoggedIn()
	authFactory.isLoggedIn=function(){

		if(authToken.getToken())
		{
			//console.log('token is available');
			return true;
		}
		else
		{
			//console.log('token is not available');
			return false;
		}

	};

	//auth.getUser
	authFactory.getUser=function(){

		if(authToken.getToken())
		{
			return $http.post('api/me');
		}
		else
		{
			$q.reject({ message: 'User has not token'});
		}

	};

	//Auth.logout();
	authFactory.logout=function(){
            authToken.setToken();
	};

		return authFactory;
})

.factory('authToken',function($window){

var authTokenFactory={};
    //authToken.setToken()
  authTokenFactory.setToken=function(token) {

  	if(token)
  	{
  	$window.localStorage.setItem('token',token);
  	}
  	else
  	{
  	$window.localStorage.removeItem('token');
  	}
  }
  		//authToken.getToken()
  authTokenFactory.getToken=function(){
  	return $window.localStorage.getItem('token');
  };


return authTokenFactory;

})


.factory('AuthInterceptors',function(authToken){

		var AuthInterceptorsFactory={};

		AuthInterceptorsFactory.request=function(config){

			var token=authToken.getToken();

			if(token) config.headers['x-access-token']=token;

			return config;
		};


		return AuthInterceptorsFactory;

});
