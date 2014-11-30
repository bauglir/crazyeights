/**
 * Created by danko on 28-11-2014.
 */

(function () {
	"use strict";
	angular.module('app').directive('table', function tableDirective() {
    return {
      controller: function TableController() {
        var table = this;

        table.getSvg = function(card){
          var path = card.suit.charAt(0).toUpperCase() + card.suit.slice(1);
          var file = card.rank + card.suit.charAt(0).toUpperCase() + '.svg';

          return 'svg%20playing%20cards/' + path + '/' + file;
        };

        return table;
      },
      controllerAs: 'table',
      restrict: 'E',
      scope: {
        cards: '='
      },
      templateUrl: 'app/table/table.html'
    };
  });
})();
