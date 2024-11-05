package com.newmes.onpremise.global.util;

import org.springframework.security.core.context.SecurityContextHolder;

public final class MemberInfo {

    private MemberInfo(){}

    public static String getMemberId() {

        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }
}