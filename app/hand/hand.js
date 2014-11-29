/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Hand', ['game_logic', 'comms', Hand]);

	Hand.$inject = [];

	function Hand(game_logic, comms) {

		var hand = this;

		// TODO: get the userlist from the game_logic.
		hand.players = [
			{username: 'Danko', active: true},
			{username: 'Inigo'},
			{username: 'Wema'},
			{username: 'Rob'},
			{username: 'Joris'},
			{username: 'David'}
		];

		hand.cards = [];

		hand.setPlayers = function(players){

			hand.players = players;
		};

		hand.setCard = function(cards){
			hand.cards = cards;
		};
    comms.setCardsCallback(hand.setCard);

		hand.getSvg = function(Card){

			var $path = Card.suit.charAt(0).toUpperCase() + Card.suit.slice(1);
			var $file = Card.rank + Card.suit.charAt(0).toUpperCase() + '.svg';

			return 'svg%20playing%20cards/' + $path + '/' + $file;
		};

		hand._playCard = function(Card){
      comms.send(Object.getOwnPropertyNames(comms.peers)[0], { action: 'play_card', user_id: comms.id, card: Card })
		};
	}
})();
