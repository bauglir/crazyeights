/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    'use strict';

    angular.module('app').controller('Home', Home);

    Home.$inject = ['comms', 'game_logic'];

    function Home(comms, game_logic){
        var home = this;

        home.comms = comms;

        home.hostGame = function hostGame() {
            home.is_hosting = true;
            game_logic.createGame(comms, 4);
        };

        home.game = game_logic;
        home.isHosting = false;
        home.name = "Hah Gaaaaame";
    }
})();
