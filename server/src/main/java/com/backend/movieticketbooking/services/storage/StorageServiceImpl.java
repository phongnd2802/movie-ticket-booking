package com.backend.movieticketbooking.services.storage;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Optional;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService{

    @Override
    public String uploadFile(String bucketName, String objectName, InputStream inputStream, String contentType) {
        return "";
    }

    @Override
    public Optional<InputStream> downloadFile(String bucketName, String objectName) {
        return Optional.empty();
    }

    @Override
    public void deleteFile(String bucketName, String objectName) {

    }

    @Override
    public String getPresignedUrl(String bucketName, String objectName, int expiryTime) {
        return "";
    }
}
