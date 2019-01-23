var app = angular.module("app",["ui.router","pagination"]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "admin/home.html"
        }).state("goodsEdit", {
        url: "/goodsEdit",
        templateUrl: "admin/goods_edit.html"
    });
});
