/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Login', ['$scope', Login]);

	function Login($scope) {

		var login = this;

		$scope.submit = function () {

			if ($scope.text) {

				$scope.username = this.text;
				login.username = this.text;
				$scope.text = '';
			}
		};
	}
})();