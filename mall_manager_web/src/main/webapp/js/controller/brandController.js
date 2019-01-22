app.controller('brandController',function($scope,$http,brandService){
    $controller('baseController',{$scope:$scope});//继承

    var _ajax = brandService;
    $scope.brandList = [];
    $scope.entity = {};
    $scope.searchEntity={};

    $scope.search = function(page,size,data){
        _ajax.search(page,size,data).success(
            function (result) {
                $scope.brandList = result.rows;
                $scope.paginationConf.totalItems = result.total;
            }
        )
    };

    //保存与添加
    $scope.save = function () {
        var method = _ajax.add($scope.entity);
        if($scope.entity.id!=null){
            method = _ajax.update($scope.entity);
        }
        method.success(
            function (response) {
                if (response.success) {
                    //重新查询
                    $scope.reloadList();//重新加载
                } else {
                    alert(response.message);
                }
            });
    };

    //编辑
    $scope.editBrand = function(brand){
        $scope.entity = brand;
    };

    //批量删除
    $scope.delete=function(){
        _ajax.delete($scope.selectIds).success(
            function(result){
                if(result.success){
                    $scope.reloadList();
                }
            }
        );
    };

});

