/**
 * @author Rob van den Hout
 * @version 1.0.0
 */

(function game_configs(){

	"use strict";

	angular.module('app')
		.service('game_configs', function(){

			return {

				games: ['Pesten'],

				Pesten: {

					deal_count: 7,

					isCardAllowed: function isCardAllowed(topCard, newCard){

						if(!newCard.suit && !newCard.rank){

							return true;
						}

						if(newCard.suit == topCard.suit){

							return true;
						}

						return newCard.rank == topCard.rank;
					}
				}
			};
		});
})();