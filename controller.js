angular.module('formula', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']).controller('formulaController', function ($scope, $http) {
    //enable the option so that only one accordion can be opened at a time
    $scope.oneAtATime = true;

    //list containing necessary seasons
    $scope.seasons = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007'];

    //determines which season from accordion heading is selected
    $scope.active = function (season) {
        $scope.data = [];
        getRaces(season);

        $scope.champion = [];
        getSeasonChampion(season);
    };

    //using $http service, getting the data about races for requested season
    var getRaces = function (season) {
        $http.get("http://ergast.com/api/f1/" + season+ "/results/1.json").then(function (response) {
            $scope.data = response.data.MRData.RaceTable.Races;
        });
    };

    //using $http service, getting the data about driver standings for requested season
    var getSeasonChampion = function (season) {
        $http.get("http://ergast.com/api/f1/" + season + "/driverstandings/1.json").then(function (response) {
            $scope.champion = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.code;
        });

    }

});