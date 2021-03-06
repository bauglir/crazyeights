(function() {
    'use strict'

    angular.module('app').service('comms', ['$rootScope', 'game_logic', function Comms($rootScope, game_logic) {
        var comms = {
            id: '<not set>',
            peers: {},
            received_messages: []
        };

        var setCards;

        var peer = new Peer({ key: 'z4zuz8j1qtkmlsor', secure: true });

        peer.on('open', function(id) {
            comms.id = id;
            $rootScope.$apply();
        });

        peer.on('error', function(error) {
          console.error(error);
        });

        // This section establishes a master->client relation with the current
        // peer, where the current peer acts as the master.
        peer.on('connection', function connectionEstablished(connection) {
          comms.peers[connection.peer] = connection;
          game_logic.addPlayer({ id: connection.peer });

          connection.on('open', function connectionOpened() {
              connection.on('data', function receiveData(data) {
                  if(data.action === 'play_card') {
                      game_logic.playCard(data.user_id, data.card);
                  } else if(data.action === 'pass') {
                      game_logic.grabCard(data.user_id);
                  }
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

        comms.hasPeers = function hasPeers(amount) {
            amount = amount || -1;
            return (Object.getOwnPropertyNames(comms.peers).length >= amount);
        };

        // Sets another peer as the master of the current peer
        comms.join = function join(host_id) {
          var peer_connection = peer.connect(host_id);
          comms.peers[peer_connection.peer] = peer_connection;

          peer_connection.on('open', function connectionOpened() {
              peer_connection.send('join');

              peer_connection.on('data', function receiveData(data) {
                  if(data.action === 'cards') {
                      setCards(data.cards);
                  }
                  comms.received_messages.push(data);
                  $rootScope.$apply();
              });
          });
        };

        // Sends a message to a known peer
        comms.send = function send(client_id, message) {
            comms.peers[client_id].send(message);
        };

        comms.setCardsCallback = function setCardsCallback(callback) {
            console.log('Setting cards callback');
            setCards = callback;
        };

        return comms;
    }]);
})();
