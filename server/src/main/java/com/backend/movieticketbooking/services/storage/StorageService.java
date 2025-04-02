package com.backend.movieticketbooking.services.storage;

import java.io.InputStream;
import java.util.Optional;

public interface StorageService {
    /**
     * Upload a file to the storage
     *
     * @param bucketName the name of the bucket
     * @param objectName the name of the object (file name)
     * @param inputStream inputStream the file content
     * @param contentType the MIME type of the file
     * @return the URL of the upload file
     */
    String uploadFile(String bucketName, String objectName, InputStream inputStream, String contentType);

    /**
     * Downloads a file from the storage
     *
     * @param bucketName the name of the bucket
     * @param objectName the name of the object (file name)
     * @return an Optional containing the InputStream of the file, or empty if not found
     */
    Optional<InputStream> downloadFile(String bucketName, String objectName);

    /**
     * Deletes a file from the storage.
     *
     * @param bucketName the name of the bucket
     * @param objectName the name of the object (file name)
     */
    void deleteFile(String bucketName, String objectName);

    /**
     * Generates a pre-signed URL for accessing the file.
     *
     * @param bucketName the name of the bucket
     * @param objectName the name of the object (file name)
     * @param expiryTime the expiration time in seconds
     * @return the pre-signed URL
     */
    String getPresignedUrl(String bucketName, String objectName, int expiryTime);
}
