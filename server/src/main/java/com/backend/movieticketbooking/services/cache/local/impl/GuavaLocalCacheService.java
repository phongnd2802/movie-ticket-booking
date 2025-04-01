package com.backend.movieticketbooking.services.cache.local.impl;

import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import java.util.concurrent.TimeUnit;

public class GuavaLocalCacheService<K, V> implements LocalCacheService<K, V> {
    private final Cache<K, V> cache;

    public GuavaLocalCacheService(Long maxSize, Long expireAfterWrite) {
        this.cache = CacheBuilder.newBuilder()
                .concurrencyLevel(6)
                .maximumSize(maxSize)
                .expireAfterWrite(expireAfterWrite, TimeUnit.SECONDS)
                .build();
    }

    @Override
    public void put(K key, V value) {
        cache.put(key, value);
    }

    @Override
    public V get(K key) {
        return cache.getIfPresent(key);
    }

    @Override
    public void remove(K key) {
        cache.invalidate(key);
    }

    @Override
    public void clear() {
        cache.invalidateAll();
    }
}
