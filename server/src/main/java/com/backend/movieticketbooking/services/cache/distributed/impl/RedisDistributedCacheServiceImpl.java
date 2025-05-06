package com.backend.movieticketbooking.services.cache.distributed.impl;

import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RedisDistributedCacheServiceImpl implements DistributedCacheService {

    RedisTemplate<String, Object> redisTemplate;

    ObjectMapper objectMapper;

    @Override
    public void setString(String key, String value) {
        if (!StringUtils.hasLength(key)) { // null or ''
            return;
        }
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public void setStringTTL(String key, String value, long timeout, TimeUnit unit) {
        if (!StringUtils.hasLength(key)) {
            return;
        }

        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }

    @Override
    public String getString(String key) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(key))
                .map(String::valueOf)
                .orElse(null);
    }

    @Override
    public void setObject(String key, Object value) {
        if (!StringUtils.hasLength(key)) {
            return;
        }
        try {
            redisTemplate.opsForValue().set(key, value);
        } catch (Exception e) {
            log.error("setObject error: {}", e.getMessage());
        }
    }

    @Override
    public <T> T getObject(String key, Class<T> targetClass) {
       Object result = redisTemplate.opsForValue().get(key);
       if (result == null) {
           return null;
       }

       // Nếu kết quả là một LinkedHashMap
       if (result instanceof Map) {
           try {
                // Chuyển đổi thành đối tượng mục tiêu
               return objectMapper.convertValue(result, targetClass);
           } catch (IllegalArgumentException e) {
               log.error("Error converting LinkedHashMap to Object: {}", e.getMessage());
               return null;
           }
       }
       // Nếu result là String
        if (result instanceof String) {
            try {
                return objectMapper.readValue((String) result, targetClass);
            } catch (JsonProcessingException e) {
                log.error("Error deserializing JSON to Object: {}", e.getMessage());
                return null;
            }
        }

        return null;
    }

    @Override
    public void setObjectTTL(String key, Object value, Long ttl, TimeUnit timeUnit) {
        if (!StringUtils.hasLength(key)) {
            return;
        }

        try {
            redisTemplate.opsForValue().set(key, value, ttl, timeUnit);
        } catch (Exception e) {
            log.error("setObject error: {}", e.getMessage());
        }
    }


    @Override
    public Long getTTL(String key) {
        if (!StringUtils.hasLength(key)) {
            return null;
        }
        try {
            return redisTemplate.getExpire(key, TimeUnit.SECONDS); // TTL tính bằng giây
        } catch (Exception e) {
            log.error("getTTL error: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public void deleteKey(String key) {
        if(!StringUtils.hasLength(key)) {
            return;
        }
        try {
            redisTemplate.delete(key);
        } catch (Exception e) {
            log.error("deleteKey error: {}", e.getMessage());
        }
    }

    @Override
    public boolean exists(String key) {
        if(!StringUtils.hasLength(key)) {
            return false;
        }
        try {
            Boolean result = redisTemplate.hasKey(key);
            return result != null && result;
        } catch (Exception e) {
            log.error("exists error: {}", e.getMessage());
            return false;
        }
    }
}
