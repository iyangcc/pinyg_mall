 //控制层 
app.controller('specificationController' ,function($scope,$controller ,specificationService){
	$controller('baseController',{$scope:$scope});//继承

	var _ajax = specificationService;
	$scope.specificationList = [];
	$scope.searchEntity={};
	$scope.entity = {"specificationOptionList":[{}]};

	
	//查询实体 
	$scope.findOne=function(id){
		_ajax.findOne(id).success(
			function(result){
				$scope.entity.specificationOptionList = result;
			}
		);				
	};
	
	//保存 
	$scope.save=function(){
		if($scope.entity.id!=null){//如果有ID
			_ajax=_ajax.update( $scope.entity ); //修改
		}else{
			_ajax=_ajax.add( $scope.entity  );//增加
		}
		_ajax.success(
			function(result){
				if(result.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(result.message);
				}
			}
		);
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

	$scope.search = function(page,size,data){
		_ajax.search(page,size,data).success(
			function (result) {
				$scope.specificationList = result.rows;
				$scope.paginationConf.totalItems = result.total;
			}
		)
	};

	//编辑
	$scope.editSpecification = function(specification){
		$scope.entity.specification = specification;
		$scope.findOne(specification.id);
	};

	//新增选项行
	$scope.addTableRow=function(){
		$scope.entity.specificationOptionList.push({});
	};

	//批量选项删除
	$scope.deleteTableRow=function(index){
		if($scope.entity.specificationOptionList.length<=1){
			return;
		}else{
			$scope.entity.specificationOptionList.splice(index,1);
		}
	};
    
});	
