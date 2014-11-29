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

        peer.on('connection', function connectionEstablished(connection) {
          connection.on('open', function connectionOpened() {
              connection.on('data', function receiveData(data) {
                  console.log(data);
              });
          });
        });

        comms.sendMessageTo = function sendMessageTo(recipient, message) {
          var peer_connection = peer.connect(recipient);

          peer_connection.on('open', function connectionOpened() {
              peer_connection.send(message);
          });
        }

        return comms;
    }]);
})();
