/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Login', ['$scope', Login]);

	function Login($scope) {

		var login = this;

		/**
		 * These cards are here temporarily.
		 * @type {*[]}
		 */
		login.cards = [
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
			{id: 23, suit: 'diamonds', rank: '1'},
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
			{id: 36, suit: 'hearts', rank: '1'},
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
			{id: 49, suit: 'spades', rank: '9'},
			{id: 50, suit: 'spades', rank: '1'},
			{id: 51, suit: 'spades', rank: 'J'},
			{id: 52, suit: 'spades', rank: 'Q'},
			{id: 53, suit: null, rank: null},
			{id: 54, suit: null, rank: null}
		];

		$scope.setCard = function(){

			var Card = angular.fromJson($scope.card);

			var $path = Card.suit.charAt(0).toUpperCase() + Card.suit.slice(1);
			var $file = Card.rank + Card.suit.charAt(0).toUpperCase() + '.svg';

			$scope.currentCard = 'svg%20playing%20cards/' + $path + '/' + $file;
		}

		$scope.submit = function () {

			if ($scope.text) {

				$scope.username = this.text;
				$scope.text = '';
			}
		};
	}
})();