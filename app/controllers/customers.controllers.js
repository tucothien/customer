﻿
app.controller('CustomersController', function ($scope, customersService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.customers = customersService.getCustomers();
    }

    $scope.insertCustomer = function (firstName,lastName,city) {
        customersService.insertCustomer(firstName,lastName,city);
    };

    $scope.deleteCustomer = function (id) {
       customersService.deleteCustomer(id);
    };
});