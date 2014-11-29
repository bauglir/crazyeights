/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    'use strict';

    angular.module('app').controller('Home', Home);

    Home.$inject = ['comms', 'game_logic'];

    function Home(comms, game_logic){
        var home = this;
        home.name = "Hah Gaaaaame";
        home.comms = comms;
		home.game = game_logic;
    }
})();
