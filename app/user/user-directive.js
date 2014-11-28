angular.module('app.user',[])
.directive('user',function(){
    return {
        restict: 'E',
        controllerAs: 'user',
        controller: function(){
            var user = this;
            user.name = 'foo';
            alert('controller');
        }
    }
})