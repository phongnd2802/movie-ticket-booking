package com.backend.movieticketbooking.services.kafka;


import com.backend.movieticketbooking.services.email.EmailService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KafkaConsumer {

    EmailService emailService;

    ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "otp-auth-topic", groupId = "otp-group-id")
    public void listenOTP(String message, Acknowledgment ack) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);
            String email = jsonNode.get("email").asText();
            String otp = jsonNode.get("otp").asText();
            log.info("otp is {}, email is {}", otp, email);

            emailService.sendTextEmail(email, "OTP for email verification", otp);
            ack.acknowledge();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
