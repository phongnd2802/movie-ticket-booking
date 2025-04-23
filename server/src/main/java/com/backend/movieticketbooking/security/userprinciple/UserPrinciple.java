package com.backend.movieticketbooking.security.userprinciple;

import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class UserPrinciple implements UserDetails {
    private String username;

    @JsonIgnore
    private String password;

    @JsonDeserialize(contentUsing = GrantedAuthorityDeserializer.class)
    private List<GrantedAuthority> authorities;


    public static UserPrinciple build(UserEntity user) {
        log.info("Building UserPrinciple");
        List<GrantedAuthority> authorityList = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return UserPrinciple.builder()
                .username(user.getUserEmail())
                .password(user.getUserPassword())
                .authorities(new ArrayList<>(authorityList))
                .build();
    }


    @Override
    public List<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
