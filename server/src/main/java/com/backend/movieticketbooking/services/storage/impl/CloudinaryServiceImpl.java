package com.backend.movieticketbooking.services.storage.impl;

import com.backend.movieticketbooking.services.storage.StorageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.netty.util.internal.ObjectUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Qualifier("cloudinaryStorage")
public class CloudinaryServiceImpl implements StorageService {

    Cloudinary cloudinary;
    @Override
    public String uploadFile(String bucketName, String objectName, InputStream inputStream, String contentType) {
        try {
            if (objectName.contains(".")) {
                objectName = objectName.substring(0, objectName.lastIndexOf('.'));
            }
            Map uploadOptions = ObjectUtils.asMap(
                    "public_id", bucketName + "/" + objectName,
                    "resource_type", "auto"
            );

            byte[] bytes = inputStream.readAllBytes();
            Map<?, ?> result = cloudinary.uploader().upload(bytes, uploadOptions);
            return result.get("secure_url").toString();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException("Failed to upload file to Cloudinary", e);
        }
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
