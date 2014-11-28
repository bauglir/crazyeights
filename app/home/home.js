/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    "use strict";
    angular.module('app').controller('Home', Home);

    Home.$inject = [];

    function Home(){
        var home = this;
        home.name = "Hah Gaaaaame";
    }
})();