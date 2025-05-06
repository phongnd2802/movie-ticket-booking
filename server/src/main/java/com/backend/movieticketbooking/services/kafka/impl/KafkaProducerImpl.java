package com.backend.movieticketbooking.services.kafka.impl;

import com.backend.movieticketbooking.services.kafka.KafkaProducer;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KafkaProducerImpl implements KafkaProducer {

    KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public void sendSync(String topic, String message) {
        try {
            CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic, message);
            SendResult<String, String> result = future.get(); // Đợi kết quả đồng bộ
            log.info("Message sent to partition: {}", result.getRecordMetadata().partition());
            log.info("Message offset: {}", result.getRecordMetadata().offset());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendAsync(String topic, String message) {
        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic, message);
        future.whenComplete((result, ex) -> {
            if (ex != null) {
                log.error("Error while sending message", ex);
            } else {
                log.info("Message sent to partition: {}", result.getRecordMetadata().partition());
            }
        });
    }

    @Override
    public void sendFireAndForget(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
}
