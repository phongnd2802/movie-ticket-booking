package com.backend.movieticketbooking.services.cache.local;

public interface LocalCacheService<K, V> {
    void put(K key, V value);
    V get(K key);
    void remove(K key);
    void clear();
}
