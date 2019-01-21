package com.pinyg.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyg.mapper.TbBrandMapper;
import com.pinyg.pojo.TbBrand;
import com.pinyg.pojo.TbBrandExample;
import com.pinyg.pojo.TbBrandExample.Criteria;
import com.pinyg.sellergoods.service.BrandService;
import entity.PageResult;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private TbBrandMapper mapper;

    @Override
    public List<TbBrand> findAll() {
        return mapper.selectByExample(null);
    }

    @Override
    public PageResult findPage(int current, int size, TbBrand brand){
        PageHelper.startPage(current,size);
        TbBrandExample example=new TbBrandExample();
        Criteria criteria = example.createCriteria();
        if (brand!=null) {
            if (brand.getName()!=null&&brand.getName().length()>0) {
                criteria.andNameLike("%"+brand.getName()+"%");
            }
            if(brand.getFirstChar()!=null && brand.getFirstChar().length()>0){
                criteria.andFirstCharEqualTo(brand.getFirstChar());
            }
        }
        Page<TbBrand> page = (Page<TbBrand>) mapper.selectByExample(example);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public List<Map> selectOptionList() {
        return mapper.selectOptionList();
    }

    @Override
    public void addBrand(TbBrand brand){
        mapper.insert(brand);
    }

    @Override
    public void update(TbBrand brand){
        mapper.updateByPrimaryKey(brand);
    }

    @Override
    public void delete(Long[] ids) {
        for (Long id : ids) {
            mapper.deleteByPrimaryKey(id);
        }
    }
}
