var app = angular.module('ngMap');

app.controller('socket',['$scope','socket',function($scope,socket){

	socket.on('bill_generated', function (data) {

		window.location.assign('/customerRideBill?bill='+data.bill.billingId);
	});

}]);


app.controller('rides', function($scope, $rootScope, $http) {

	//alert("getRideImage");
	$rootScope.getRidesInfo = function(customerId){


		$http({
			method: "GET",
			url : '/searchBills',
			params : {
				startPosition : 0,
				searchText : customerId
			}
		}).success(function(response){

			// alert('inside');

			$scope.rides = response;

			angular.forEach(response, function(res){

//			alert(res.billingId);

				$http({
					method: "GET",
					url: '/getImagesOfRide',
					params: {
						billId: res.billingId
					}
				}).success(function(response){
//				alert("billId ");
				});

			});


		}).error(function(){

			alert("error");
		});

	};

});

app.controller('navbar',['$scope','$rootScope', '$http','socket', function($scope, $rootScope, $http,socket) {


	$http.get("/getCustomerInformation").success(function(response) {
		if (response.status == 200) {
			$scope.firstName = response.data.firstName;
			$scope.email = response.data.email;
			$rootScope.getRidesInfo(response.data.email);
			socket.emit('join',{ email: $scope.email });
		}
		else{
			//window.location.assign('/logout');
		}

	}).error(function(error){
		window.location.assign('/errorCustomer');
	});
}]);



app.controller('profile', function($scope, $http) {


	$http.get("/getCustomerInformation").success(function(response) {
		if (response.status == 200) {
			$scope.firstName = response.data.firstName;
			$scope.lastName = response.data.lastName;
			$scope.ssn = response.data.ssn;
			$scope.state = response.data.state;
			$scope.zipCode = response.data.zipCode;
			$scope.email = response.data.email;
			$scope.city = response.data.city;
			$scope.creditCard = response.data.creditCard;
			$scope.phoneNumber = response.data.phoneNumber;


			//console.log(JSON.stringify($scope.customer));
		}
		else{
			//window.location.assign('/logout');
		}

	}).error(function(error){
		window.location.assign('/errorCustomer');
	});

	$scope.save = function($event) {

		angular.forEach($scope.profileUpdate.$error.required, function(field) {
			field.$setDirty();
		});

		if($scope.profileUpdate.$error.required){
			$event.preventDefault();

			alert("Please fill all the fields before saving");
		}

		else{

			$http({
				method : "POST",
				url : '/updateCustomer',
				data : {

					"email" : $scope.email,
					"firstName" : $scope.firstName,
					"lastName" : $scope.lastName,
					"state" : $scope.state,
					"city" : $scope.city,
					"zipCode": $scope.zipCode,
					"creditCard" : $scope.creditCard,
					"phoneNumber" : $scope.phoneNumber

				}
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 401) {
					//alert("error");
					window.location.assign('/errorCustomer');
				}
				else{

					//Making a get call to the '/redirectToHomepage' API
					window.location.assign("/customerDashboard");
				}
			}).error(function(error){
				window.location.assign('/errorCustomer');
			});
		}
	};
});


/*app.controller('payment', function($scope, $http) {


	$http.get("/getCustomerInformation").success(function(response) {
		if (response.status == 200) {

			$scope.creditCard = response.data.creditCard;
			//console.log(JSON.stringify($scope.customer));
		}

	}).error(function(error){
		window.location.assign('/errorCustomer');
	});
});*/