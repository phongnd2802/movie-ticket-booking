package com.backend.movieticketbooking.services.email.impl;

import com.backend.movieticketbooking.services.email.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GoogleEmailServiceImpl implements EmailService {

    JavaMailSender mailSender;

    private static final String EMAIL_FROM = "backend.movieticketbooking@gmail.com";

    @Override
    public void sendTextEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom(EMAIL_FROM);

        try {
            mailSender.send(message);

            System.out.println("Email sent successfully");

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendHtmlEmail(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(EMAIL_FROM);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
            System.out.println("Email sent successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendAttachmentsEmail(String to, String subject, String body) {

    }
}
