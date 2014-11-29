/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').controller('Table', Table);

	Table.$inject = [];

	function Table() {

		var table = this;

		// TODO: get the userlist from the game_logic.

		table.players = [
			{username: 'Danko'},
			{username: 'Indigo'},
			{username: 'Wema'},
			{username: 'Rob'},
			{username: 'Joris'},
			{username: 'David'}
		];
	}
})();