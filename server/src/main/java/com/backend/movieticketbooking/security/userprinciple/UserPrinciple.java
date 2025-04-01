package com.backend.movieticketbooking.security.userprinciple;

import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPrinciple implements UserDetails {

    private String userEmail;

    private String userName;

    private String userMobile;

    private  boolean userGender;

    private LocalDate userBirthday;

    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;


    public static UserPrinciple build(UserEntity user) {
        List<GrantedAuthority> authorityList = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return UserPrinciple.builder()
                .userEmail(user.getUserEmail())
                .password(user.getUserPassword())
                .authorities(authorityList)
                .build();
    }

    public static UserPrinciple build(UserEntity user, ProfileEntity profile) {
        List<GrantedAuthority> authorityList = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return UserPrinciple.builder()
                .userEmail(user.getUserEmail())
                .password(user.getUserPassword())
                .authorities(authorityList)
                .userGender(profile.isUserGender())
                .userBirthday(profile.getUserBirthday())
                .userName(profile.getUserName())
                .userMobile(profile.getUserMobile())
                .build();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
