/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    "use strict";
    angular.module('app').config([ '$routeProvider', function($routeProvider){
           $routeProvider.when('/',
               {
                   templateUrl : "app/home/home.html",
                   controller : "Home",
                   controllerAs : "home"
               })
               .otherwise({ redirectTo: '/'})
        }]);
})();