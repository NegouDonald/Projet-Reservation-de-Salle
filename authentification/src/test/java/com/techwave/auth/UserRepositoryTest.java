package com.techwave.auth;

import com.techwave.auth.user.model.User;
import com.techwave.auth.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertTrue;

@SpringBootTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByUsername() {
        Optional<User> user = userRepository.findByUsername("enseignant");
        assertTrue(user.isPresent());
        System.out.println(user.get().getUsername());
    }

    private void assertTrue(boolean present) {
    }
}