package com.pinyg.service;

import com.pinyg.pojo.TbSeller;
import com.pinyg.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;

public class UserDetailsServiceImpl implements UserDetailsService {

    private SellerService sellerService;

    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TbSeller seller = null;
        try {
            seller = sellerService.findOne(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //查询到的用户封装为UserDetails
        User u = new User(seller.getSellerId(),seller.getPassword(),seller.getStatus()=="0"?false:true,true,true,true, getAuthority());
        return u;
    }

    private Collection<? extends GrantedAuthority> getAuthority() {
        ArrayList<SimpleGrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_SELLER"));
        return list;
    }
}
