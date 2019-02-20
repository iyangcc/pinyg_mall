package com.pinyg.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.pinyg.pojo.TbItem;
import com.pinyg.search.service.ItemSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;
import java.util.List;
import java.util.Map;

@Component
public class ItemSearchListener implements MessageListener {

    @Autowired
    private ItemSearchService itemSearchService;

    @Override
    public void onMessage(Message message) {
        try {
            TextMessage textMessage = (TextMessage) message;
            String text = textMessage.getText();
            List<TbItem> list = JSON.parseArray(text,TbItem.class);
            for (TbItem item : list) {
                //将spec字段中的json字符串转换为map
                Map specMap = JSON.parseObject(item.getSpec());
                //给带注解的字段赋值
                item.setSpecMap(specMap);
            }
            //导入
            itemSearchService.importList(list);
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
