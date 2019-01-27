app.controller('goodsManagerController' ,function($scope,$controller ,$state,goodsService,itemCatService) {
    $controller('baseController', {$scope: $scope});//继承

    $scope.searchEntity={};//定义搜索对象

    $scope.status=['未审核','已审核','未通过','关闭'];//商品状态 0 1 2 3
    $scope.itemCatList=[];//商品分类列表

    //搜索
    $scope.search=function(page,rows){
        goodsService.search(page,rows,$scope.searchEntity).success(
            function(response){
                $scope.list=response.rows;
                $scope.paginationConf.totalItems=response.total;//更新总记录数
            }
        );
    };

    $scope.findItemCatList=function() {
        itemCatService.findAll().success(
            function (response) {
                for (var i = 0; i < response.length; i++) {
                    $scope.itemCatList[response[i].id] = response[i].name;
                }
            }
        );
    }

    $scope.goGoodsEdit=function(id){
        $state.go("goodsEdit",{id:id});
    }
    });