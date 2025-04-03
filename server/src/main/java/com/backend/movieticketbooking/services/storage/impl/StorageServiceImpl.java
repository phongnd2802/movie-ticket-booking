package com.backend.movieticketbooking.services.storage.impl;


import com.backend.movieticketbooking.services.storage.StorageService;
import com.backend.movieticketbooking.utils.SnowflakeGenerator;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StorageServiceImpl implements StorageService {

    MinioClient minioClient;

    private static final String MINIO_HOST = "http://localhost:9000/";

    SnowflakeGenerator snowflakeGenerator;

    @Override
    public String uploadFile(String bucketName, String objectName, InputStream inputStream, String contentType) {
        try {
            String uniqueObjectName = generateUniqueObjectName(objectName);

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(uniqueObjectName)
                            .stream(inputStream, -1, 10485760)
                            .contentType(contentType)
                            .build()
            );

            return MINIO_HOST + bucketName + "/" + uniqueObjectName;
        } catch (Exception e) {
            log.error("Error while uploading file: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<InputStream> downloadFile(String bucketName, String objectName) {
        try {
            return Optional.of(minioClient.getObject(
                io.minio.GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .build()
            ));
        } catch (Exception e) {
            log.error("Error while downloading file: {}", e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public void deleteFile(String bucketName, String objectName) {
        try {
            minioClient.removeObject(
                    io.minio.RemoveObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build()
            );
            log.info("File deleted: {}", objectName);
        } catch (Exception e) {
            log.error("Error while deleting file: {}", e.getMessage());
        }
    }

    @Override
    public String getPresignedUrl(String bucketName, String objectName, int expiryTime) {
        return "";
    }

    private String generateUniqueObjectName(String objectName) {
        long id = snowflakeGenerator.nextId();
        return objectName + "-" + id;
    }
}
