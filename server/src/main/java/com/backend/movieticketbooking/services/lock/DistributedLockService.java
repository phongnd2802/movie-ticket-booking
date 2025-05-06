package com.backend.movieticketbooking.services.lock;

public interface DistributedLockService {
    DistributedLocker getDistributedLock(String lockKey);
}
