package com.newmes.onpremise.global.util;

public class MemberSessions {

    private String memberId;
    private String[] sessionIds;
    private int curr;

    public MemberSessions(String memberId){
      sessionIds = new String[5];
      curr = 0;
      this.memberId = memberId;
    }

    public String addSession(String sessionId){
      String expired = sessionIds[curr];
      sessionIds[curr] = sessionId;
      curr = (curr + 1) % 5;
      return expired;
    }

    public String[] getSessionIds(){
      return sessionIds;
    }
}
