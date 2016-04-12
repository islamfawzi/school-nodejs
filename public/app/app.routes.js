angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

		.when('/', {

			templateUrl: 'app/views/pages/home.html',
			controller : 'SchoolController',
			controllerAs: 'school'

		})
		.when('/add', {

			templateUrl: 'app/views/pages/add.html',
			controller: 'addSchoolController',
			controllerAs: 'school'

		})
        .when('/get/:id', {

        	templateUrl: 'app/views/pages/add.html',
			controller: 'addSchoolController',
			controllerAs: 'school'
			
        }) 
        .otherwise({
            redirectTo: '/'
            });
	
	// configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);

});