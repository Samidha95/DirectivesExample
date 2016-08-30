/**
 * Created by Sami on 28-Aug-16.
 */
var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'http://localhost:8080/index.html',
            controller: 'myCtrl'
        }).
        when('/loginSucess', {
            templateUrl: 'http://localhost:8080/homePage.html',
            controller: 'myCtrl'
        }).
        otherwise({
            redirectTo: '/index.html'
        });
    }]);
app.controller('myCtrl', function($scope, $http) {
    $http.get("http://localhost:8080/LoginCredetials.JSON").then(function (response) {
        $scope.myData = response.data.records;
        $scope.myFunc = function(){
        }
    });
});
app.directive('myCustomer', ['$window',function($window) {
    return {
        //template: 'Name: {{myData[0].username}} Address: {{myData[0].password}}'
       // template : "<div>{{password}}</div>"
        templateUrl:"loginPage.html",
        link: function($scope, element, attrs) {
            $scope.clickMe= function() {
                //alert('inside click');
                var valid = false;
                var data  = $scope.myData;
                for (i = 0; i < data.length; i++) {
                    if (data[i].username == $scope.username) {
                        if (data[i].password == $scope.password) {
                            valid = true;
                        }
                    }
                }
                //$location.path("#loginSucess");
                if(valid == true) {
                    $window.location.assign('homePage.html');
                }
                else
                {
                    document.getElementById("message").innerHTML = "Incorrect username or Password";
                }
            }
        }
    };
}]);