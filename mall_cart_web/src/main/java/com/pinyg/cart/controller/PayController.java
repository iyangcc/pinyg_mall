package com.pinyg.cart.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyg.common.IdWorker;
import com.pinyg.pay.service.WeixinPayService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 支付控制层
 */
@RestController
@RequestMapping("/pay")
public class PayController {
    @Reference
    private WeixinPayService weixinPayService;

    /**
     * 生成二维码
     * @return
     */
    @RequestMapping("/createNative")
    public Map createNative(){
        IdWorker idworker=new IdWorker();
        return weixinPayService.createNative(idworker.nextId()+"","1");
    }

}
