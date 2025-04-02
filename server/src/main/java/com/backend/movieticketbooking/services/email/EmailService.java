package com.backend.movieticketbooking.services.email;


public interface EmailService {
    void sendTextEmail(String to, String subject, String body);
    void sendHtmlEmail(String to, String subject, String body);
    void sendAttachmentsEmail(String to, String subject, String body);
}
