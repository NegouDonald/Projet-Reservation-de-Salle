package com.techwave.auth.dto;

import lombok.Data;
//import javax.validation.constraints.AssertTrue;

@Data
public class RegisterRequest {
    private String email;
    private String password;
//    private String confirmPassword;

//    @AssertTrue(message = "Les mots de passe ne correspondent pas")
//    public boolean isPasswordMatching() {
//        if (password == null || confirmPassword == null) {
//            return false;
//        }
//        return password.equals(confirmPassword);
//    }
}
