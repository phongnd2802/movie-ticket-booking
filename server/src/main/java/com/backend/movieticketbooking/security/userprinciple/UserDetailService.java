package com.backend.movieticketbooking.security.userprinciple;

import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepository.findByUserEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }

        return UserPrinciple.build(user.get());
    }

    public UserDetails fromUserEntity(UserEntity userEntity) {
        return UserPrinciple.build(userEntity);
    }

    public UserDetails withUserProfile(UserEntity user, ProfileEntity profile) {
        return UserPrinciple.build(user, profile);
    }
}
