/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Hand', ['game_logic', Hand]);

	Hand.$inject = [];

	function Hand(game_logic) {

		var hand = this;

		// TODO: get the userlist from the game_logic.

		hand.players = [
			{username: 'Danko'},
			{username: 'Inigo'},
			{username: 'Wema'},
			{username: 'Rob'},
			{username: 'Joris'},
			{username: 'David'}
		];

		hand.cards = [
			{id: 1,  suit: 'clubs', rank: 'A'},
			{id: 2,  suit: 'clubs', rank: '2'},
			{id: 3,  suit: 'clubs', rank: '3'},
			{id: 4,  suit: 'clubs', rank: '4'},
			{id: 5,  suit: 'clubs', rank: '5'}
		];

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
			game_logic.playCard(1, Card);
		};
	}
})();