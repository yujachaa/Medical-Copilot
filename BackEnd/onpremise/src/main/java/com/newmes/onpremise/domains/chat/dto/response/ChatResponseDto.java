package com.newmes.onpremise.domains.chat.dto.response;

import com.newmes.onpremise.domains.chat.domain.Chat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatResponseDto {
    String PID;
    List<Chat> chatList;
}
