app.controller('searchController',function($scope,searchService){

    $scope.searchMap={'keywords':'','category':'','brand':'','spec':{}};//搜索对象
    //添加搜索项
    $scope.addSearchItem=function(key,value){
        if(key=='category' || key=='brand'){//如果点击的是分类或者是品牌
            $scope.searchMap[key]=value;
        }else{
            $scope.searchMap.spec[key]=value;
        }
    }

    //搜索
    $scope.search=function(){
        searchService.search( $scope.searchMap ).success(
            function(response){
                $scope.resultMap=response;//搜索返回的结果
            }
        );
    }
});
