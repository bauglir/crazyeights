angular.module('app.user',[])
.directive('user',function(){
    return {
        restict: 'E',
        templateUrl: 'app/user/user.html',
        controllerAs: 'user',
        controller: function(){
            var user = this;
            user.loguser()
        }
    }
})