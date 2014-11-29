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

        // This section establishes a master->client relation with the current
        // peer, where the current peer acts as the master.
        peer.on('connection', function connectionEstablished(connection) {
          comms.peers[connection.peer] = connection;

          connection.on('open', function connectionOpened() {
              connection.on('data', function receiveData(data) {
                  comms.received_messages.push(data);
                  $rootScope.$apply();
              });
          });
        });

        // Broadcasts a message to every client which is connected to the peer
        // as a client
        comms.broadcast = function broadcast(message) {
            angular.forEach(comms.peers, function(client) {
                client.send(message);
            });
        };

        comms.hasPeers = function hasPeers() {
            return (Object.getOwnPropertyNames(comms.peers).length !== 0);
        };

        // Sets another peer as the master of the current peer
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

        // Sends a message to a known peer
        comms.send = function send(client_id, message) {
            comms.peers[client_id].send(message);
        };

        return comms;
    }]);
})();
