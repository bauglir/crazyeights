angular.module('app.user',[])
.directive('user',function(){
    return {
        restict: 'E',
        templateUrl: 'app/user/user.html',
        controllerAs: 'user',
        controller: function(){
            var user = this;
            user.hostgame = function hostgame() {
                console.log(user.name);  
            };
            user.joingame = function joingame(){
                console.log(user.name,user.hostid);  
            };

            // to merge two forms to one. above functions could be removed if final
            user.play = function play(){
                if(user.role_choice == 'user'){
                    user.joingame();
                } else {
                    user.hostgame();
                }
            };
        }
    }
})