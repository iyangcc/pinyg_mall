//购物车控制层
app.controller('cartController',function($scope,cartService){

	$scope.order={paymentType:'1'};
	$scope.address={};
	$scope.provinceList=null;
	$scope.cityList=null;
	$scope.areasList=null;

	//查询购物车列表
	$scope.findCartList=function(){
		cartService.findCartList().success(
			function(response){
				$scope.cartList=response;
				$scope.totalValue= cartService.sum($scope.cartList);
			}
		);
	}
	
	//数量加减
	$scope.addGoodsToCartList=function(itemId,num){
		cartService.addGoodsToCartList(itemId,num).success(
			function(response){
				if(response.success){//如果成功
					$scope.findCartList();//刷新列表
				}else{
					alert(response.message);
				}				
			}		
		);		
	}

	//获取地址列表
	$scope.findAddressList=function(){
		cartService._findAddressList().success(
			function(response){
				$scope.addressList=response;
				//设置默认地址
				for(var i=0;i< $scope.addressList.length;i++){
					if($scope.addressList[i].isDefault=='1'){
						$scope.address=$scope.addressList[i];
						break;
					}
				}
			}
		);
	}
	
	//添加收获地址
	$scope.addToAddressList=function(){
		cartService.add($scope.address).success(function (response) {
			if(response.success){
				alert(response.message);
				$scope.findAddressList();
			}
		})
	}

	//选择地址
	$scope.selectAddress=function(address){
		$scope.address=address;
	}

	//判断是否是当前选中的地址
	$scope.isSelectedAddress=function(address){
		if(address==$scope.address){
			return true;
		}else{
			return false;
		}
	}

	//选择支付方式
	$scope.selectPayType=function(type){
		$scope.order.paymentType= type;
	}

	//获取省份
	$scope.findProvinceList=function () {
		cartService._findProvinceList().success(
			function (result) {
				$scope.provinceList=result;
			});
	}

	//获取市
	$scope.$watch('address.provinceId', function(n, o) {
		cartService._findCityList(n).success(
			function (result) {
				$scope.cityList=result;
			})
	})

	//获取县区
	$scope.$watch('address.cityId', function(n, o) {
		cartService._findAreasList(n).success(
			function (result) {
				$scope.areasList=result;
			});
	})

});