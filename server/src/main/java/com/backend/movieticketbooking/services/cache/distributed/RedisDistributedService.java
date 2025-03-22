package com.backend.movieticketbooking.services.cache.distributed;

import java.util.concurrent.TimeUnit;
/**
 * Interface for interacting with a Redis distributed caching system.
 */
public interface RedisDistributedService {

    /**
     * Stores a string value in Redis.
     *
     * @param key   the key to store the value under
     * @param value the string value to be stored
     */
    void setString(String key, String value);

    /**
     * Retrieves a string value from Redis.
     *
     * @param key the key associated with the value
     * @return the string value if found, otherwise null
     */
    String getString(String key);

    /**
     * Stores an object in Redis after serializing it.
     *
     * @param key   the key to store the object under
     * @param value the object to be stored
     */
    void setObject(String key, Object value);

    /**
     * Retrieves an object from Redis and deserializes it to the specified class.
     *
     * @param key         the key associated with the object
     * @param targetClass the class type to deserialize the object into
     * @param <T>         the type parameter
     * @return the deserialized object if found, otherwise null
     */
    <T> T getObject(String key, Class<T> targetClass);

    /**
     * Stores an object in Redis with a time-to-live (TTL).
     *
     * @param key       the key to store the object under
     * @param value     the object to be stored
     * @param ttl       the time-to-live duration
     * @param timeUnit  the unit of time for TTL (e.g., seconds, minutes)
     */
    void setObjectTTL(String key, Object value, Long ttl, TimeUnit timeUnit);

    /**
     * Retrieves the remaining TTL (time-to-live) for a given key.
     *
     * @param key the key to check the TTL for
     * @return the remaining TTL in seconds, or -1 if the key has no expiration
     */
    Long getTTL(String key);

    /**
     * Deletes a key from Redis.
     *
     * @param key the key to be deleted
     */
    void deleteKey(String key);

    /**
     * Checks if a key exists in Redis.
     *
     * @param key the key to check
     * @return true if the key exists, false otherwise
     */
    boolean exists(String key);
}