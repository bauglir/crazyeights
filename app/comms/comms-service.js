(function() {
    'use strict'

    angular.module('app').service('comms', ['$rootScope', function Comms($rootScope) {
        var comms = {
            id: '<not set>',
            peers: {},
            received_messages: []
        };

        var peer = new Peer({ key: 'z4zuz8j1qtkmlsor' });

        peer.on('open', function(id) {
            comms.id = id;
            $rootScope.$apply();
        });

        peer.on('connection', function connectionEstablished(connection) {
          comms.peers[connection.peer] = connection;

          connection.on('open', function connectionOpened() {
              connection.on('data', function receiveData(data) {
                  comms.received_messages.push(data);
                  $rootScope.$apply();
              });
          });
        });

        comms.broadcast = function broadcast(message) {
            angular.forEach(comms.peers, function(client) {
                client.send(message);
            });
        };

        comms.join = function join(host_id) {
          var peer_connection = peer.connect(host_id);
          comms.peers[peer_connection.peer] = peer_connection;

          peer_connection.on('open', function connectionOpened() {
              peer_connection.send('join');

              peer_connection.on('data', function receiveData(data) {
                  comms.received_messages.push(data);
                  $rootScope.$apply();
              });
          });
        };

        comms.send = function send(client_id, message) {
            comms.peers[client_id].send(message);
        };

        return comms;
    }]);
})();
