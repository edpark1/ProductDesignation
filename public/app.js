var productApp = angular.module("productApp", []);

productApp.controller("AppCtrl", function($http){
    var app = this;
    var url = "http://localhost:3000";
    
    app.saveProduct =  function (newProduct){
        $http.post(url + "/products/add", {name:newProduct}).success(function(){
            loadProducts();
        });
    }

    app.deleteProduct =  function (delProduct){
        $http.post(url + "/products/delete", {name:delProduct}).success(function(){
            loadProducts();
        });
    }

    app.searchProduct =  function (searchFilter){
        $http.get(url + "/products" + "?name=" + searchFilter).success(function(products){
           app.products = products;
        });
    }

    function loadProducts() {
        $http.get(url).success(function (products) {
            app.products = products;
        });
    }

    loadProducts();
})