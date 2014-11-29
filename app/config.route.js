/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    "use strict";
    angular.module('app').config([ '$routeProvider', function($routeProvider){
		   $routeProvider.when('/login',
			   {
				   templateUrl: 'app/login/login.html',
				   controller : "Login",
				   controllerAs : "login"
			   }
		   );
		   $routeProvider.when('/hand',
			   {
				   templateUrl: 'app/hand/hand.html',
				   controller : "Hand",
				   controllerAs : "hand"
			   }
		   );
		   $routeProvider.when('/table',
			   {
				   templateUrl: 'app/table/table.html',
				   controller : "Table",
				   controllerAs : "table"
			   }
		   );
           $routeProvider.when('/',
               {
                   templateUrl : "app/home/home.html",
                   controller : "Home",
                   controllerAs : "home"
               })
               .otherwise({ redirectTo: '/'})
        }]);
})();