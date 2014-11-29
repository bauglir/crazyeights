angular.module('app.user',[])
.directive('user', ['$location', function($location) {
    return {
        restrict: 'E',
        templateUrl: 'app/user/user.html',
        controllerAs: 'user',
        controller: function($location) {
            var user = this;
            var searchObject = $location.search();
            user.hostid = searchObject.host;
            user.role_choice = 'user';

            user.setName = function setName(name) {
                user.name = name;
            };

            return user;
        }
    }
}]);
