/*
package com.pinyg.service.impl;

import com.pinyg.service.UserManagerService;
import com.pinyg.mapper.TbUserMapper;
import com.pinyg.pojo.TbUser;
import com.pinyg.pojo.TbUserExample;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;

public class UserManagerServiceImpl implements UserManagerService {

    private TbUserMapper userMapper;

    public void setUserMapper(TbUserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TbUser user = null;
        try {
            TbUserExample example=new TbUserExample();
            TbUserExample.Criteria criteria = example.createCriteria();
            criteria.andNameEqualTo(username);
            user = userMapper.selectByExample(example).get(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //查询到的用户封装为UserDetails
        User u = new User(user.getUsername(),user.getPassword(),user.getStatus()=="0"?false:true,true,true,true, getAuthority());
        return u;
    }

    */
/**
     * 设置权限
     * @return
     *//*

    private Collection<? extends GrantedAuthority> getAuthority() {
        ArrayList<SimpleGrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return list;
    }
}
*/
