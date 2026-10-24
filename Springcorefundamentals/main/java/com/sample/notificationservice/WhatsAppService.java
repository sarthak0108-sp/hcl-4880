package com.sample.notificationservice;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary
public class WhatsAppService implements NotificationService {

    @Override
    public void sendMsg(String msg) {
        System.out.println("WhatsAppService"+msg);
    }
}
