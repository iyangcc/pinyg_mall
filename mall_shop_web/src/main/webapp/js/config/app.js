var app = angular.module("app",["ui.router","pagination"]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "admin/home.html"
        }).state("goodsEdit", {
        url: "/goodsEdit",
        params:{"id":null},
        templateUrl: "admin/goods_edit.html"
        }).state("goods", {
        url: "/goods",
        templateUrl: "admin/goods.html"
    });
});
