package com.backend.movieticketbooking.services.auth.cache;


import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import com.backend.movieticketbooking.services.cache.local.impl.GuavaLocalCacheService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;

@Configuration
public class CacheConfig {
    @Bean
    public LocalCacheService<String, UserDetails> userCacheService() {
        return new GuavaLocalCacheService<>(1000L, 900L);
    }

}
