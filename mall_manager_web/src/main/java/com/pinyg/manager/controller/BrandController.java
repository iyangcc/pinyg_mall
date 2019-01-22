package com.pinyg.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyg.pojo.TbBrand;
import com.pinyg.sellergoods.service.BrandService;
import entity.PageResult;
import entity.Result;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("brand")
public class BrandController {

    @Reference
    private BrandService service;

    @RequestMapping("findAll")
    public List<TbBrand> findAll() {
        return service.findAll();
    }

    @RequestMapping("search")
    public PageResult findPage(@RequestBody TbBrand brand,int page, int rows) {
        return service.findPage(brand , page, rows);
    }

    @RequestMapping("add")
    public Result addBrand(@RequestBody TbBrand brand) {
        try {
            service.addBrand(brand);
            return new Result(true, "保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "保存失败");
        }
    }

    @RequestMapping("update")
    public Result updateBrand(@RequestBody TbBrand brand){
        try {
            service.update(brand);
            return new Result(true, "修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "修改失败");
        }
    }

    @RequestMapping("/delete")
    public Result delete(Long [] ids){
        try {
            service.delete(ids);
            return new Result(true,"删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"删除失败");
        }
    }

    @RequestMapping("selectOptionList")
    public List<Map> selectOptionList(){
        return service.selectOptionList();
    }
}