/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Hand', ['game_configs', 'game_logic', Hand]);

	Hand.$inject = [];

	function Hand(game_configs, game_logic) {

		var hand = this;

		// TODO: get the hands user_id.
		hand.player_id = 1;

		// TODO: get the userlist from the game_logic.
		hand.players = [
			{username: 'Danko', active: true},
			{username: 'Inigo'},
			{username: 'Wema'},
			{username: 'Rob'},
			{username: 'Joris'},
			{username: 'David'}
		];

		hand.random = Math.floor(Math.random() * game_configs.cards.length);
		hand.cards = game_configs.cards.slice(hand.random - game_configs.Pesten.deal_count, hand.random);

		hand.setPlayers = function(players){

			hand.players = players;
		};

		hand.setCard = function(cards){

			hand.cards = cards;
		};

		hand.getSvg = function(Card){

			var $path = Card.suit.charAt(0).toUpperCase() + Card.suit.slice(1);
			var $file = Card.rank + Card.suit.charAt(0).toUpperCase() + '.svg';

			return 'svg%20playing%20cards/' + $path + '/' + $file;
		};

		hand._playCard = function(Card){

			// TODO: send user_id.
			game_logic.playCard(hand.player_id, Card);
		};
	}
})();