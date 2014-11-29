/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    'use strict';

    angular.module('app').controller('Home', Home);

    Home.$inject = ['comms'];

    function Home(comms){
        var home = this;
        home.name = "Hah Gaaaaame";
        home.comms = comms;
    }
})();
