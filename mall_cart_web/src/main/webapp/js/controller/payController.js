app.controller('payController',function ($scope,payService) {
    //本地生成二位码
    $scope.createNative=function () {
        payService.createNative().success(
            function (result) {
                $scope.money=(result.total_fee/100).toFixed(2);//金额
                $scope.out_trade_no=result.out_trade_no;//订单号
                //二位码
                var qr = new QRious({
                    element:document.getElementById('qrious'),
                    size:250,
                    level:'H',
                    value:result.code_url
                });
            }
        )
    }
})