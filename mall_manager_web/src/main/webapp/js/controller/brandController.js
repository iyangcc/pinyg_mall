app.controller('brandController',function($scope,$http,brandService){

    var _ajax = brandService;
    $scope.brandList = [];
    $scope.entity = {};
    $scope.selectIds=[];
    $scope.searchEntity={};

    $scope.search = function(page,size,data){
        _ajax.search(page,size,data).success(
            function (result) {
                $scope.brandList = result.rows;
                $scope.paginationConf.totalItems = result.total;
            }
        )
    };

    $scope.reloadList = function(){
        //切换页码
        $scope.search( $scope.paginationConf.currentPage,
            $scope.paginationConf.itemsPerPage,$scope.searchEntity);
    };

    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList();//重新加载
        }
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

    //更新选择id数值
    $scope.updateSelection = function($event, id) {
        if($event.target.checked){
            $scope.selectIds.push( id);
        }else{
            var idx = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(idx, 1);
        }
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

