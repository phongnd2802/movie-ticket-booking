package com.backend.movieticketbooking.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class BaseEntity {
    @CreationTimestamp // Automating fill time value when entity is stored to database
    @Column(updatable = false, nullable = false)
    @JsonIgnore
    LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    @JsonIgnore
    LocalDateTime updatedAt;
}
