angular.module('app.user',[])
.directive('user',function(){
    return {
        restict: 'E',
        templateUrl: 'app/user/user.html',
        controllerAs: 'user',
        controller: function(){
            var user = this;
            user.hostgame = function hostgame() {
                console.log(user.hostid);  
            };
            user.joingame = function joingame(){
                console.log(user.username,user.hostid);  
            };
        }
    }
})
