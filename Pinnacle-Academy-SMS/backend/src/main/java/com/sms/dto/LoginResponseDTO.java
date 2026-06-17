package com.sms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private Long userId;
}