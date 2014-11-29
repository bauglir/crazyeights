/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Hand', Hand);

	Hand.$inject = [];

	function Hand() {

		var table = this;

		// TODO: get the userlist from the game_logic.

		table.players = [
			{username: 'Danko'},
			{username: 'Inigo'},
			{username: 'Wema'},
			{username: 'Rob'},
			{username: 'Joris'},
			{username: 'David'}
		];

		table.cards = [
			{id: 1,  suit: 'clubs', rank: 'A'},
			{id: 2,  suit: 'clubs', rank: '2'},
			{id: 3,  suit: 'clubs', rank: '3'},
			{id: 4,  suit: 'clubs', rank: '4'},
			{id: 5,  suit: 'clubs', rank: '5'}
		];

		table.getSvg = function(Card){

			var $path = Card.suit.charAt(0).toUpperCase() + Card.suit.slice(1);
			var $file = Card.rank + Card.suit.charAt(0).toUpperCase() + '.svg';

			return 'svg%20playing%20cards/' + $path + '/' + $file;
		};

		table.playCard = function(Card){

			// TODO: game logic playcard.
			alert('You are going to play this card: ' + Card.suit + Card.rank);
		};
	}
})();