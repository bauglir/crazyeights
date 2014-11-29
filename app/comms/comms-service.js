(function() {
    'use strict'

    angular.module('app').service('comms', ['$rootScope', function Comms($rootScope) {
        var comms = this;

        comms.id = '<not set>';

        var peer = new Peer({ key: 'z4zuz8j1qtkmlsor' });

        peer.on('open', function(id) {
            comms.id = id;
            $rootScope.$apply();
        });

        return comms;
    }]);
})();
