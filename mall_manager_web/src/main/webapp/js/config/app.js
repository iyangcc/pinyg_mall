var app = angular.module("app",["ui.router","pagination"]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/home");
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "admin/home.html"
        }).state("brand", {
            url:"/brand",
            templateUrl: "admin/brand.html"
        }).state("specification", {
        url:"/specification",
        templateUrl: "admin/specification.html"
        }).state("typeTemplate", {
        url:"/typeTemplate",
        templateUrl: "admin/type_template.html"
        });
});
