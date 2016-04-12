var app = angular.module('MyApp', ['appRoutes']);


app.controller('SchoolController', function($scope, $http){
	
	var school = this;

    $scope.schools_length = 0;  
    $http.get("/school/list")
       .then(function (response) 
       {
       	$scope.schools = response.data;
        $scope.schools_length = response.data.length;
       });

    
   
    school.deleteSchool = function(school_id, schools_length)
    {
      
       $http.delete("school/delete/" + school_id);
     
       $scope.schools_length = schools_length - 1; 
          
    }   
})

.controller('addSchoolController', function($scope, $http, $routeParams, $timeout, $location){

   var school = this;
   school.contacts = [1];

   if($routeParams.id){
   	   $http.get("/school/get/" + $routeParams.id)
		         .then(function (response) 
			         {
			           school.schoolData = response.data.school;
                 school.contacts   = response.data.contacts;
                 school.schoolData.contacts = 
                 {
                    ids:   [],
                    type:  [],
                    value: []
                 };
                 

                 for(var x in school.contacts){
                    school.schoolData.contacts.ids[x] = school.contacts[x]._id; 
                    school.schoolData.contacts.type[x] = school.contacts[x].type; 
                    school.schoolData.contacts.value[x] = school.contacts[x].value; 
                 }

                 school.update = true;

			         });	
   }
   

   school.addSchool = function(){
      
      if(typeof school.schoolData._id !== "undefined")
      {
        school.schoolData.types  = [];
        school.schoolData.values = [];
        school.schoolData.ids = [];

        for(var x in school.schoolData.contacts.type)
        {

          school.schoolData.types.push(school.schoolData.contacts.type[x]);
          school.schoolData.values.push(school.schoolData.contacts.value[x]);
          school.schoolData.ids.push(school.schoolData.contacts.ids[x]);
        }


        $http.patch('/school/update/' + school.schoolData._id, school.schoolData)
	        .then(function(response){
	      	  $scope.success = response.data.success;
	          $scope.message = response.data.message;

	          if($scope.success){
	          	$timeout(function(){
	          		$location.path("/");
	          	}, 3000);
	          }
	        });

      }
      else
      {
       
	    $http.post('/school/add', school.schoolData)
	        .then(function(response){
	      	  school.schoolData = '';
            school.contacts = [1];
	          $scope.success = response.data.success;
	          $scope.message = response.data.message;
	        });

      }
     
   }

   school.addmore = function()
   {
     
     school.contacts.push(school.contacts.length + 1);
     console.log(school.contacts);
   }
});