
var myApp = angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $state, $rootScope, $ionicPopup) {
	$rootScope.isAdmin = false;
	$rootScope.ipAddress = "http://172.16.1.88/yApp/";
   // $rootScope.user_name = "";

	$scope.login = function(){

	   	console.log("sign In");
		var isValidUser = false;

            if($scope.username == null || $scope.username == ""){
                $rootScope.user_availability = true;
            }


			/*if($scope.username == "service")
			{
				$rootScope.isAdmin = true;
			}
			else
			{
				$rootScope.isAdmin = false;
			}*/

            if($scope.username!=null&&$scope.password!=null){

        	var jsonData = {username: $scope.username, password:$scope.password};

        	//alert(objToString(jsonData));
        	 $.ajax({
                    type: "POST",
                    data: jsonData,
                    datatype: "json",
                    url: $scope.ipAddress + "login_user.php",
                    success: function(data){
                        //var getArray = JSON.parse(data).split(",");

                    	var json = $.parseJSON(data);
                    	    //if(var i in json)
                    	    console.log("sucess block" +" "+ json[0] +" "+ "hiii");
                            if(json[0]!=null){
                                 console.log("  "+json[4]);
                                 $rootScope.user_name = json[4];
                                if(json[8]=='1'){

                                   $rootScope.isAdmin = true;
                                    var user = json[3];
                                    console.log(" it is admin");
                                    $state.go('landingPage');

                                }else{
                                    $rootScope.isAdmin = false;
                                    var user = json[3];
                                    console.log("it is not admin");
                                    $state.go('landingPage');
                                }
                            }else{
                                alert("Login Failed. Invalid User.");
                            }
                        },
        	        error: function(err)
        	            {
        	            	//alert(objToString(err));
        	            	$ionicPopup.alert({
                                   title: 'Login Notification',
                                   content: 'You are not connected to network.'});

        	            	console.log("error block");
        	            	isValidUser=false;
        	            }
                    });


        			function objToString (obj) {
        			    var str = '';
        			    for (var p in obj) {
        			        if (obj.hasOwnProperty(p)) {
        			            str += p + '::' + obj[p] + '\n';
        			        }
        			    }
        			    return str;
        			}
        			}
        			else{
        			    if($scope.username==null){
        			        alert("username should not be empty");
        			    }else if($scope.loginID==null){
                                alert("loginID should not be empty");
                        }
        			}



		/*if( ($scope.username == "service" && $scope.password == "service") || ($scope.username == "user" && $scope.password == "user"))
			isValidUser = true;*/


	};

	$scope.sendEmail = function(){
		 $scope.modal.hide();
		 alert("Email Sent Successfully.");
	};

})



.controller('landingCtrl', function($scope, $rootScope, $state, $location, $window, $ionicPopup, $timeout, $ionicSideMenuDelegate) {

	  $scope.toggleLeft = function(){
          		console.log("toggle left.");
          		$ionicSideMenuDelegate.toggleLeft();

          	}
                    $scope.logout = function(){

                         //   $rootScope.isAdmin = false;
                           var confirmPopup = $ionicPopup.confirm({
                                title: 'User Logout',
                                template: 'Are you sure you want to logout?'
                              });

                              confirmPopup.then(function(res) {
                                if(res) {
                                     $timeout(function() {
                                       $window.location.reload(true);
                                       $location.path('/app');
                                       });
                                   $location.path('/app');
                                  console.log('You are sure');
                                } else {
                                  console.log('You are not sure');
                                }
                              });


                    };


    });







