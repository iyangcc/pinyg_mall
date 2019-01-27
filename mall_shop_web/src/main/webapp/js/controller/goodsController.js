 //控制层 
app.controller('goodsController' ,function($scope,$controller ,$state,$stateParams,$location,goodsService,itemCatService,uploadService,typeTemplateService){
	$controller('baseController',{$scope:$scope});//继承

	var editor;
	KindEditor.ready(function(K) {
		editor = K.create('textarea[name="content"]', {
			allowFileManager : true
		});
	});

	$scope.entity={goods:{},goodsDesc:{itemImages:[],specificationItems:[]}};
	$scope.image_entity={};
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	};

	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}
		);
	};
	
	//查询实体 
	$scope.findOne=function(){
		var id=$stateParams.id;//获取参数值
		if(id==null){
			return ;
		}
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;
				//向富文本编辑器添加商品介绍
				editor.html($scope.entity.goodsDesc.introduction);
				//显示图片列表
				$scope.entity.goodsDesc.itemImages= JSON.parse($scope.entity.goodsDesc.itemImages);
				$scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.entity.goodsDesc.customAttributeItems);
				$scope.entity.goodsDesc.specificationItems = JSON.parse($scope.entity.goodsDesc.specificationItems);
				for( var i=0;i<$scope.entity.itemList.length;i++ ){
					$scope.entity.itemList[i].spec = JSON.parse( $scope.entity.itemList[i].spec);
				}
			}
		);				
	};

	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象
		$scope.entity.goodsDesc.introduction=editor.html();
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					alert('保存成功');
					$scope.entity={};
					editor.html('');//清空富文本编辑器
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	};

	/**
	 * 文件上传
	 */
	$scope.uploadFile=function(){
		uploadService.uploadFile().success(function(response) {
			if(response.success){//如果上传成功，取出url
				$scope.image_entity.url=response.message;//设置文件地址
			}else{
				alert(response.message);
			}
		}).error(function() {
			alert("上传发生错误");
		});
	};

	//将当前上传的图片实体存入图片列表
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	};

	//移除图片
	$scope.remove_image_entity=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
		$scope.deleteImage();
	};

	$scope.deleteImage=function () {
		goodsService.deleteImage().success(
			function(response){

			}
		);
	};

	//读取一级分类
	$scope.selectItemCat1List=function() {
		itemCatService.findByParentId(0).success(
			function (result) {
				$scope.itemCat1List=result;
			});
	};

	//读取二级分类
	$scope.$watch('entity.goods.category1Id', function(n, o) {
		itemCatService.findByParentId(n).success(
			function (result) {
				$scope.itemCat2List=result;
			});
	});

	//读取二级分类
	$scope.$watch('entity.goods.category2Id', function(n, o) {
		itemCatService.findByParentId(n).success(
			function (result) {
				$scope.itemCat3List=result;
			});
	});

	//读取三级分类
	$scope.$watch('entity.goods.category3Id', function(n, o) {
		itemCatService.findOne(n).success(
			function (result) {
				$scope.entity.goods.typeTemplateId=result.typeId;
			});
	});

	//模板ID选择后  更新品牌列表
	$scope.$watch('entity.goods.typeTemplateId', function(n, o) {
		typeTemplateService.findOne(n).success(
			function(response){
				$scope.typeTemplate=response;//获取类型模板
				$scope.typeTemplate.brandIds= JSON.parse( $scope.typeTemplate.brandIds);//品牌列表
				if($stateParams.id==null) {
					$scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.typeTemplate.customAttributeItems);
				}
			}
		);
		//查询规格列表
		typeTemplateService.findSpecList(n).success(
			function(response){
				$scope.specList=response;
			}
		);
	});

	$scope.updateSpecAttribute=function($event,name,value){

		var object= $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems ,'attributeName', name);

		if(object!=null){
			if($event.target.checked ){
				object.attributeValue.push(value);
			}else{//取消勾选
				object.attributeValue.splice( object.attributeValue.indexOf(value ) ,1);//移除选项
				//如果选项都取消了，将此条记录移除
				if(object.attributeValue.length==0){
					$scope.entity.goodsDesc.specificationItems.splice(
						$scope.entity.goodsDesc.specificationItems.indexOf(object),1);
				}

			}
		}else{
			$scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]});
		}

	};

	//创建SKU列表
	$scope.createItemList=function(){

		$scope.entity.itemList=[{spec:{},price:0,num:99999,status:'0',isDefault:'0'} ];//列表初始化

		var items= $scope.entity.goodsDesc.specificationItems;

		for(var i=0;i<items.length;i++){
			$scope.entity.itemList= addColumn( $scope.entity.itemList, items[i].attributeName,items[i].attributeValue );
		}

	};

	addColumn=function(list,columnName,columnValues){

		var newList=[];
		for(var i=0;i< list.length;i++){
			var oldRow=  list[i];
			for(var j=0;j<columnValues.length;j++){
				var newRow=  JSON.parse( JSON.stringify(oldRow)  );//深克隆
				newRow.spec[columnName]=columnValues[j];
				newList.push(newRow);
			}
		}
		return newList;
	}

	//根据规格名称和选项名称返回是否被勾选
	$scope.checkAttributeValue=function(specName,optionName){
		var items= $scope.entity.goodsDesc.specificationItems;
		var object= $scope.searchObjectByKey(items,'attributeName',specName);
		if(object==null){
			return false;
		}else{
			if(object.attributeValue.indexOf(optionName)>=0){
				return true;
			}else{
				return false;
			}
		}
	}


});
