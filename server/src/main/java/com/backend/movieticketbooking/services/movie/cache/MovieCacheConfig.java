package com.backend.movieticketbooking.services.movie.cache;

import com.backend.movieticketbooking.entities.movies.MovieEntity;
import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import com.backend.movieticketbooking.services.cache.local.impl.GuavaLocalCacheService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MovieCacheConfig {
    @Bean
    @Qualifier("movieLocalCacheService")
    public LocalCacheService<String, MovieEntity> movieLocalCacheService() {
        return new GuavaLocalCacheService<>(100L, 900L);
    }

}
