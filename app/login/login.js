/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Login', ['$scope', Login]);

	function Login($scope) {

		var login = this;

		login.cards = {
			clubs_2c: {
				name: 'Club 2',
				path: 'Clubs/2c.svg'
			},
			clubs_3c: {
				name: 'Club 3',
				path: 'Clubs/3c.svg'
			},
			clubs_4c: {
				name: 'Club 4',
				path: 'Clubs/4c.svg'
			},
			clubs_5c: {
				name: 'Club 5',
				path: 'Clubs/5c.svg'
			}
		};

		$scope.setCard = function(){

			$scope.currentCard = 'svg%20playing%20cards/' + $scope.card;
		}

		$scope.submit = function () {

			if ($scope.text) {

				$scope.username = this.text;
				$scope.text = '';
			}
		};
	}
})();