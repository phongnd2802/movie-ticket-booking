package com.backend.movieticketbooking.configs;


import com.backend.movieticketbooking.security.handler.AccessDeniedJsonHandler;
import com.backend.movieticketbooking.security.jwt.JwtEntryPoint;
import com.backend.movieticketbooking.security.jwt.JwtTokenFilter;
import com.backend.movieticketbooking.security.userprinciple.UserDetailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebSecurityConfig {

    JwtEntryPoint jwtEntryPoint;

    AccessDeniedJsonHandler accessDeniedJsonHandler;

    UserDetailsService userDetailsService;

    JwtTokenFilter jwtTokenFilter;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/register").permitAll()
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/auth/verify-otp").permitAll()
                        .requestMatchers("/auth/otp-session").permitAll()
                        .requestMatchers("/auth/resend-otp").permitAll()
                        .requestMatchers("/hi").permitAll()
                        .requestMatchers("/actuator/**").permitAll()
                        .requestMatchers("/movie/**").permitAll()
                        .requestMatchers("/admin/movie/**").hasAuthority("ADMIN")
                        .requestMatchers("/address/**").permitAll()
                        .requestMatchers("/admin/cinema/**").hasAuthority("ADMIN")
                        .requestMatchers("/admin/show/**").hasAuthority("ADMIN")
                        .requestMatchers("/show/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/booking/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/payment/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/search/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtEntryPoint)
                        .accessDeniedHandler(accessDeniedJsonHandler))
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}
