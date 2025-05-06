package com.backend.movieticketbooking.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class CryptoUtil {
    public static String sha256Hash(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            // Convert byte array to hex string
            StringBuffer hexString = new StringBuffer();
            for (byte b : hash) {
                hexString.append(String.format("%02x", b));
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public static String encodeBase64(String input) {
        return Base64.getEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }

    public static String decodeBase64(String input) {
        byte[] decodedBytes = Base64.getDecoder().decode(input);
        return new String(decodedBytes, StandardCharsets.UTF_8);
    }
}
