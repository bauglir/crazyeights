/**
 * @author Rob van den Hout
 * @version 1.0.0
 */

(function game_logic(){

	"use strict";

	angular.module('app')
		.service('game_logic',[ 'comms', 'game_configs', function(comms, game_configs){

		var cards = [
			{id: 1,  suit: 'clubs', rank: 'A'},
			{id: 2,  suit: 'clubs', rank: '2'},
			{id: 3,  suit: 'clubs', rank: '3'},
			{id: 4,  suit: 'clubs', rank: '4'},
			{id: 5,  suit: 'clubs', rank: '5'},
			{id: 6,  suit: 'clubs', rank: '6'},
			{id: 7,  suit: 'clubs', rank: '7'},
			{id: 8,  suit: 'clubs', rank: '8'},
			{id: 9,  suit: 'clubs', rank: '9'},
			{id: 10, suit: 'clubs', rank: '10'},
			{id: 11, suit: 'clubs', rank: 'J'},
			{id: 12, suit: 'clubs', rank: 'Q'},
			{id: 13, suit: 'clubs', rank: 'K'},
			{id: 14, suit: 'diamonds', rank: 'A'},
			{id: 15, suit: 'diamonds', rank: '2'},
			{id: 16, suit: 'diamonds', rank: '3'},
			{id: 17, suit: 'diamonds', rank: '4'},
			{id: 18, suit: 'diamonds', rank: '5'},
			{id: 19, suit: 'diamonds', rank: '6'},
			{id: 20, suit: 'diamonds', rank: '7'},
			{id: 21, suit: 'diamonds', rank: '8'},
			{id: 22, suit: 'diamonds', rank: '9'},
			{id: 23, suit: 'diamonds', rank: '10'},
			{id: 24, suit: 'diamonds', rank: 'J'},
			{id: 25, suit: 'diamonds', rank: 'Q'},
			{id: 26, suit: 'diamonds', rank: 'K'},
			{id: 27, suit: 'hearts', rank: 'A'},
			{id: 28, suit: 'hearts', rank: '2'},
			{id: 29, suit: 'hearts', rank: '3'},
			{id: 30, suit: 'hearts', rank: '4'},
			{id: 31, suit: 'hearts', rank: '5'},
			{id: 32, suit: 'hearts', rank: '6'},
			{id: 33, suit: 'hearts', rank: '7'},
			{id: 34, suit: 'hearts', rank: '8'},
			{id: 35, suit: 'hearts', rank: '9'},
			{id: 36, suit: 'hearts', rank: '10'},
			{id: 37, suit: 'hearts', rank: 'J'},
			{id: 38, suit: 'hearts', rank: 'Q'},
			{id: 39, suit: 'hearts', rank: 'K'},
			{id: 40, suit: 'spades', rank: 'A'},
			{id: 41, suit: 'spades', rank: '2'},
			{id: 42, suit: 'spades', rank: '3'},
			{id: 43, suit: 'spades', rank: '4'},
			{id: 44, suit: 'spades', rank: '5'},
			{id: 45, suit: 'spades', rank: '6'},
			{id: 46, suit: 'spades', rank: '7'},
			{id: 47, suit: 'spades', rank: '8'},
			{id: 48, suit: 'spades', rank: '9'},
			{id: 49, suit: 'spades', rank: '10'},
			{id: 50, suit: 'spades', rank: 'J'},
			{id: 51, suit: 'spades', rank: 'Q'},
			{id: 52, suit: 'spades', rank: 'K'},
			{id: 53, suit: null, rank: null},
			{id: 54, suit: null, rank: null}
		];

		var Game = {
			config: game_configs.Pesten,
			player_count: 0,
			Host: null,
			players: {},
			stack: [],
			order: []
		};

		function shuffle(o){
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}

		function deal(){

			var dealt = 0;
			var Card;

			while(dealt < Game.config.deal_count){

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
			Game.Host.cards.push(Card);
			comms.send(Game.Host.id, {action: 'layoff', card: Card});
		}

		return {

			createGame: function startGame(player_count){

				console.debug('creating game', player_count);

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

				if(Game.player_count >= Game.order.length){

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

			startGame: function startGame(){

				console.debug('Starting game');

				Game.stack = shuffle(cards);
				console.debug(Game.stack, cards);
				deal();
			},

			playCard: function playCard(user_id, card){

				console.debug(user_id, 'playing card', card);

				if(Game.order.reset() != user_id){

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

				var topCard = Game.Host.cards.reset();

				if(!Game.config.isCardAllowed(topCard, card)){

					throw new Error('Card is not allowed.')
				}

				console.debug('Game.Host.cards', Game.Host.cards);
				console.debug('Player.cards', Player.cards);
				console.debug('Game.order', Game.order);

				Game.Host.cards.push(Player.cards.splice(i, 1));
				Game.order.shift();
				Game.order.push(user_id);

				console.debug('Game.Host.cards', Game.Host.cards);
				console.debug('Player.cards', Player.cards);
				console.debug('Game.order', Game.order);

				var next_user_id = Game.order.reset();

				console.debug('next_user_id', next_user_id);
				comms.send(next_user_id, {action: 'turn', cards: Player.cards});
				comms.send(Game.Host.id, {action: 'layoff', card: card});
			},

			isCardAllowed: function isCardAllowed(Card){

				var topCard = Game.Host.cards.reset();
				return Game.config.isCardAllowed(topCard, Card);
			},

			grabCard: function grabCard(user_id){

				console.debug(user_id, 'grabs card');

				if(Game.order.reset() != user_id){

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