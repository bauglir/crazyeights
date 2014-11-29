angular.module('app.user',[])
.directive('user',function() {
    return {
        restrict: 'E',
        templateUrl: 'app/user/user.html',
        controllerAs: 'user',
        controller: function() {
            var user = this;

            user.setName = function setName(name) {
                user.name = name;
            };

            return user;
        }
    }
});
