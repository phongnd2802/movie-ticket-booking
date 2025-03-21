package com.backend.movieticketbooking.services.cache.distributed;

import java.util.concurrent.TimeUnit;

public interface RedisDistributedService {
    void setString(String key, String value);
    String getString(String key);

    void setObject(String key, Object value);
    <T> T getObject(String key, Class<T> targetClass);

    void setObjectTTL(String key, Object value, Long ttl ,TimeUnit timeUnit);
    Long getTTL(String key);

    void deleteKey(String key);
    boolean exists(String key);
}
