package com.pinyg.sellergoods.service;

import com.pinyg.pojo.TbBrand;
import entity.PageResult;

import java.util.List;
import java.util.Map;

/**
 * 品牌接口
 */
public interface BrandService {
    /**
     * 查询所有品牌
     * @return
     */
    List<TbBrand> findAll();

    /**
     * 分页条件查询
     * @param page
     * @param rows
     * @param brand
     * @return
     */
    PageResult findPage(TbBrand brand, int page, int rows);

    /**
     * 品牌下拉列表
     * @return
     */
    List<Map> selectOptionList();

    /**
     * 添加商品
     * @param brand
     */
    void addBrand(TbBrand brand);

    /**
     * 更新商品信息
     * @param brand
     */
    void update(TbBrand brand);

    /**
     * 批量删除
     * @param ids
     */
    void delete(Long [] ids);

}
