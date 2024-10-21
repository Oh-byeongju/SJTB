package com.SJTB.project.user;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserResponseDto {
    private Integer userId;
    private String userEmail;

    @Builder
    public UserResponseDto(Integer userId, String userEmail) {
        this.userId = userId;
        this.userEmail = userEmail;
    }
}
