angular.module('app.user',[])
.directive('user',function(){
    return {
        restict: 'E',
        templateUrl: 'app/user/user.html',
        controllerAs: 'user',
        controller: function(){
            var user = this;
            
            user.hostgame = function hostgame(hostid) {
                console.log(hostid);  
            };
            user.joingame = function user.joingame(hostid,username){
                console.log(hostid,username);  
            };
        }
    }
})