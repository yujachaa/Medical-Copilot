package com.newmes.onpremise.global.util;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class SessionHolders {
    Map<String, MemberSessions> holders = new ConcurrentHashMap<>();

    public String addSession(String memberId, String sessionId){
        if (null == memberId){
            return null;
        }
        MemberSessions ms = holders.getOrDefault(memberId, new MemberSessions(memberId));
        String expired = ms.addSession(sessionId);
        holders.put(memberId, ms);
        return expired;
    }

    public String[] getSessions(String memberId){
        if (null == memberId){
            return null;
        }
        MemberSessions memberSessions = holders.getOrDefault(memberId, null);
        if (null != memberSessions){
            return memberSessions.getSessionIds();
        }
        return null;
    }


}
