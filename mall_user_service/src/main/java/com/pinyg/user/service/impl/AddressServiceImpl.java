package com.pinyg.user.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyg.mapper.TbAddressMapper;
import com.pinyg.mapper.TbAreasMapper;
import com.pinyg.mapper.TbCitiesMapper;
import com.pinyg.mapper.TbProvincesMapper;
import com.pinyg.pojo.*;
import com.pinyg.pojo.TbAddressExample.Criteria;
import com.pinyg.user.service.AddressService;
import entity.PageResult;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private TbAddressMapper addressMapper;

	@Autowired
	private TbProvincesMapper provincesMapper;

	@Autowired
	private TbCitiesMapper citiesMapper;

	@Autowired
	private TbAreasMapper areasMapper;
	
	/**
	 * 查询全部
	 */
	@Override
	public List<TbAddress> findAll() {
		return addressMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbAddress> page=   (Page<TbAddress>) addressMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(TbAddress address) {
		addressMapper.insert(address);		
	}

	
	/**
	 * 修改
	 */
	@Override
	public void update(TbAddress address){
		addressMapper.updateByPrimaryKey(address);
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public TbAddress findOne(Long id){
		return addressMapper.selectByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids){
			addressMapper.deleteByPrimaryKey(id);
		}		
	}
	
	
		@Override
	public PageResult findPage(TbAddress address, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbAddressExample example=new TbAddressExample();
		Criteria criteria = example.createCriteria();
		
		if(address!=null){			
						if(address.getUserId()!=null && address.getUserId().length()>0){
				criteria.andUserIdLike("%"+address.getUserId()+"%");
			}
			if(address.getProvinceId()!=null && address.getProvinceId().length()>0){
				criteria.andProvinceIdLike("%"+address.getProvinceId()+"%");
			}
			if(address.getCityId()!=null && address.getCityId().length()>0){
				criteria.andCityIdLike("%"+address.getCityId()+"%");
			}
			if(address.getTownId()!=null && address.getTownId().length()>0){
				criteria.andTownIdLike("%"+address.getTownId()+"%");
			}
			if(address.getMobile()!=null && address.getMobile().length()>0){
				criteria.andMobileLike("%"+address.getMobile()+"%");
			}
			if(address.getAddress()!=null && address.getAddress().length()>0){
				criteria.andAddressLike("%"+address.getAddress()+"%");
			}
			if(address.getContact()!=null && address.getContact().length()>0){
				criteria.andContactLike("%"+address.getContact()+"%");
			}
			if(address.getIsDefault()!=null && address.getIsDefault().length()>0){
				criteria.andIsDefaultLike("%"+address.getIsDefault()+"%");
			}
			if(address.getNotes()!=null && address.getNotes().length()>0){
				criteria.andNotesLike("%"+address.getNotes()+"%");
			}
			if(address.getAlias()!=null && address.getAlias().length()>0){
				criteria.andAliasLike("%"+address.getAlias()+"%");
			}
	
		}
		
		Page<TbAddress> page= (Page<TbAddress>)addressMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 根据用户查询地址
	 * @param userId
	 * @return
	 */
	public List<TbAddress> findListByUserId(String userId ){
		TbAddressExample example=new TbAddressExample();
		Criteria criteria = example.createCriteria();
		criteria.andUserIdEqualTo(userId);
		return addressMapper.selectByExample(example);
	}

	/**
	 * 获取省份列表
	 * @return
	 */
	@Override
	public List<TbProvinces> findProvinceList() {
		return provincesMapper.selectByExample(null);
	}

	/**
	 * 获取市区
	 * @return
	 */
	@Override
	public List<TbCities> findCityList(String id) {
		TbCitiesExample example = new TbCitiesExample();
		TbCitiesExample.Criteria criteria = example.createCriteria();
		criteria.andProvinceidEqualTo(id);
		return citiesMapper.selectByExample(example);
	}

	/**
	 * 获取县
	 * @return
	 */
	@Override
	public List<TbAreas> findAreasList(String id) {
		TbAreasExample example = new TbAreasExample();
		TbAreasExample.Criteria criteria = example.createCriteria();
		criteria.andCityidEqualTo(id);
		return areasMapper.selectByExample(example);
	}

}
