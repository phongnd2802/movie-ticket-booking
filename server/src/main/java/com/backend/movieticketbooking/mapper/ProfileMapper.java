package com.backend.movieticketbooking.mapper;

import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileEntity toProfileEntity(RegisterRequest request);
}
