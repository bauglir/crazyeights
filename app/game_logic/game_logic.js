/**
 * @author Rob van den Hout
 * @version 1.0.0
 */

(function game_logic(){

	"use strict";

	angular.module('app')
		.service('game_logic',[ 'game_configs', function(game_configs){

    var comms;

		var Game = {
			config: game_configs.Pesten,
			player_count: 0,
			Host: null,
			players: {},
			stack: [],
			order: []
		};

    var has_started = false;

		function shuffle(o){
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}

		function deal(){

			var dealt = 0;
			var Card;

			while(dealt <= Game.config.deal_count){

				for(var i = 0; i < Game.order.length; i++){

					var user_id = Game.order[i];
					var Player = Game.players[user_id];

					Player.cards = Player.cards || [];
					Card = Game.stack.shift();

					comms.send(Player.id, {action: 'cards', cards: Player.cards});

					Player.cards.push(Card);
				}

				dealt++;
			}

			Card = Game.stack.shift();
			Game.Host.cards = Game.Host.cards || [];
			Game.Host.cards.unshift(Card);
		}

		return {

			createGame: function createGame(comms_instance, player_count){

				console.debug('creating game', player_count);

        comms = comms_instance;

				Game.player_count = player_count;
				Game.players = {};
				Game.order = [];
				Game.Host = null;

				console.table(Game);
			},

			setHost: function setHost(User){

				console.debug('setting host', User);

				Game.Host = User;
			},

			addPlayer: function addPlayer(User){

				console.debug('adding player', User);

				if(Game.player_count <= Game.order.length){

					throw new Error('No more room for new player');
				}

				Game.players[User.id] = User;
				Game.order.push(User.id);

				console.debug(Game.players);
				console.debug(Game.order);
			},

			getPlayerCount: function getPlayerCount(){

				console.debug('Returning player count', Game.order.length, Game.player_count);

				return [Game.order.length, Game.player_count];
			},

      getGameState: function() {
        console.log(Game);
      },

      hasStarted: function hasStarted() {
        return has_started;
      },

			startGame: function startGame(){

				console.debug('Starting game');

        has_started = true;

				Game.stack = shuffle(game_configs.cards);
				console.debug(Game.stack, game_configs.cards);
				deal();

				var next_user_id = Game.order[0];
				var Player = Game.players[next_user_id];

				console.debug('next_user_id', next_user_id);
				comms.send(next_user_id, {action: 'turn', cards: Player.cards});
			},

			playCard: function playCard(user_id, card){

				// TODO: game logic playcard.
				console.info('player ' + user_id + ' is going to play this card: '
					+ card.suit + card.rank);

				if(Game.order[0] != user_id){

					throw new Error('Not player\'s turn.');
				}

				var Player = Game.players[user_id];
				var owns_card = false;

				for(var i = 0; i < Player.cards.length; i++){

					var own_card = Player.cards[i];
					if(own_card.id == card.id){

						card = own_card;
						owns_card = true;
						break;
					}
				}

				if(!owns_card){

					throw new Error('Player does not own this card.');
				}

				var topCard = Game.Host.cards[0];

				if(!Game.config.isCardAllowed(topCard, card)){

					throw new Error('Card is not allowed.')
				}

				console.debug('Game.Host.cards', Game.Host.cards);
				console.debug('Player.cards', Player.cards);
				console.debug('Game.order', Game.order);

				Game.Host.cards.unshift(Player.cards.splice(i, 1));
				Game.order.shift();
				Game.order.push(user_id);

				console.debug('Game.Host.cards', Game.Host.cards);
				console.debug('Player.cards', Player.cards);
				console.debug('Game.order', Game.order);

				var next_user_id = Game.order[0];

				console.debug('next_user_id', next_user_id);
				comms.send(next_user_id, {action: 'turn', cards: Player.cards});
			},

			isCardAllowed: function isCardAllowed(Card){

				var topCard = Game.Host.cards[0];
				return Game.config.isCardAllowed(topCard, Card);
			},

			grabCard: function grabCard(user_id){

				console.debug(user_id, 'grabs card');

				if(Game.order[0] != user_id){

					throw new Error('Not player\'s turn.')
				}

				var Card = Game.stack.shift();

				console.debug('Player.cards', Game.players[user_id].cards);
				console.debug('Game.order', Game.order);
				Game.players[user_id].cards.push(Card);

				Game.order.shift();
				Game.order.push(user_id);

				console.debug('Player.cards', Game.players[user_id].cards);
				console.debug('Game.order', Game.order);

				comms.send(user_id, {action: 'cards', cards: Game.players[user_id].cards});
			}
		};
	}]);
})();
