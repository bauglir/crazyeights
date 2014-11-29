/**
 * Created by wwuyts on 28-11-2014.
 */
(function () {
    'use strict';

    angular.module('app').controller('Home', Home);

    Home.$inject = ['comms', 'game_logic', '$location'];

    function Home(comms, game_logic, $location) {
        var home = this;

        home.comms = comms;

        home.hostGame = function hostGame(user) {
            user.id = comms.id;
            home.is_hosting = true;
            game_logic.createGame(comms, 4);
            game_logic.setHost(user);
        };

        home.game = game_logic;
        home.game_uri = $location.absUrl();
        home.isHosting = false;
        home.name = "Hah Gaaaaame";

        // Only display debug information if requested through a GET parameter
        var searchObject = $location.search();
        home.showDebug = searchObject.debug || false;
    }
})();
