//服务层
app.service('typeTemplateService',function($http){
	    	
	//读取列表数据绑定到表单中
	this.findAll=function(){
		return $http.get('../typeTemplate/findAll.do');		
	}
	//分页 
	this.findPage=function(page,size){
		return $http.get('../typeTemplate/findPage.do?page='+page+'&size='+size);
	}
	//查询实体
	this.findOne=function(id){
		return $http.get('../typeTemplate/findOne.do?id='+id);
	}
	//增加 
	this.add=function(entity){
		return  $http.post('../typeTemplate/add.do',entity );
	}
	//修改 
	this.update=function(entity){
		return  $http.post('../typeTemplate/update.do',entity );
	}
	//删除
	this.delete=function(ids){
		return $http.get('../typeTemplate/delete.do?ids='+ids);
	}
	//搜索
	this.search=function(page,size,searchEntity){
		return $http.post('../typeTemplate/search.do?page='+page+"&size="+size, searchEntity);
	}
	//查询模板列表
	this.selectTypeList=function () {
		return $http.get('../typeTemplate/selectTypeList.do');
	}//查询模板列表
	this.findSpecList=function (id) {
		return $http.get('../typeTemplate/selectSpecList.do?id='+id);
	}
});
