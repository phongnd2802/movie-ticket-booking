package com.backend.movieticketbooking.services.kafka;


public interface KafkaProducer {
    void sendSync(String topic, String message);
    void sendAsync(String topic, String message);
    void sendFireAndForget(String topic, String message);
}
