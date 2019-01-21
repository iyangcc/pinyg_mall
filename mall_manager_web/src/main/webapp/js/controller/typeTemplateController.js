 //控制层 
app.controller('typeTemplateController' ,function($scope,$controller   ,typeTemplateService,brandService,specificationService){

	var _ajax = typeTemplateService;
	$scope.templateList=[];
	$scope.searchEntity={};
	$scope.entity={
		name:null,
		brandIds:[],
		specIds:[],
		customAttributeItems:[{}]
	};

	$scope.brandList={data:[]};
	$scope.specList={data:[]};

	$scope.search = function(page,size,data){
		_ajax.search(page,size,data).success(
			function (result) {
				$scope.templateList = result.rows;
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
	
	//查询实体 
	$scope.findOne=function(id){				
		_ajax.findOne(id).success(
			function(result){
				$scope.entity= result;
				$scope.entity.brandIds=  JSON.parse($scope.entity.brandIds);
				$scope.entity.specIds=  JSON.parse($scope.entity.specIds);
				$scope.entity.customAttributeItems=JSON.parse($scope.entity.customAttributeItems);
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
			function(response){
				if(response.success){
		        	$scope.reloadList();
				}else{
					alert(response.message);
				}
			}		
		);				
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

	//读取品牌列表
	$scope.findBrandList=function(){
		brandService.selectOptionList().success(
			function(response){
				$scope.brandList={data:response};
			}
		);
	};

	//读取规格列表
	$scope.findSpecList=function(){
		specificationService.selectSpecList().success(
			function(response){
				$scope.specList={data:response};
			}
		);
	};

	//新增选项行
	$scope.addTableRow=function(){
		$scope.entity.customAttributeItems.push({});
	};

	//批量选项删除
	$scope.deleteTableRow=function(index){
		if($scope.entity.customAttributeItems.length<=1){
			return;
		}else{
			$scope.entity.customAttributeItems.splice(index,1);
		}
	};

	//json数据转字符串
	$scope.jsonToString=function(jsonString,key){
		//将 json 字符串转换为 json 对象
		var json=JSON.parse(jsonString);
		var value="";
		for(var i=0;i<json.length;i++){
			if(i>0){
				value+="、"
			}
			value+=json[i][key];
		}
		return value;
	}

});	
