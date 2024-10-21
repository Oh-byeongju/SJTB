package com.SJTB.project.user;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRequestDto {
    private String userEmail;
    private String userPw;
    private String userName;

    @Builder
    public UserRequestDto(String userEmail, String userPw, String userName) {
        this.userEmail = userEmail;
        this.userPw = userPw;
        this.userName = userName;
    }
}