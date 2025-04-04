package com.backend.movieticketbooking.services.cinema.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.cinema.CinemaDTO;
import com.backend.movieticketbooking.entities.cinema.CinemaEntity;
import com.backend.movieticketbooking.entities.other.AddressEntity;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.repositories.AddressRepository;
import com.backend.movieticketbooking.repositories.CinemaRepository;
import com.backend.movieticketbooking.services.cinema.CinemaService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CinemaServiceImpl implements CinemaService {

    CinemaRepository cinemaRepository;

    AddressRepository addressRepository;

    @Override
    public CinemaDTO createCinema(CinemaDTO request) {
        Optional<AddressEntity> address = addressRepository
                .findByProvinceAndDistrictAndWard(request.getCinemaProvince(), request.getCinemaDistrict(), request.getCinemaWard());

        if (address.isEmpty()) {
            throw new BadRequestException(ErrorCode.ADDRESS_NOT_FOUND);
        }

        Optional<CinemaEntity> cinemaEntity = cinemaRepository.findByCinemaStreetAndAddress(request.getCinemaStreet(), address.get());
        if (cinemaEntity.isPresent()) {
            throw new BadRequestException(ErrorCode.CINEMA_ALREADY_EXISTS);
        }

        CinemaEntity cinema = CinemaEntity.builder()
                .cinemaName(request.getCinemaName())
                .cinemaStreet(request.getCinemaStreet())
                .address(address.get())
                .build();

        cinemaRepository.save(cinema);

        return CinemaDTO.builder()
                .cinemaName(cinema.getCinemaName())
                .cinemaStreet(cinema.getCinemaStreet())
                .cinemaProvince(address.get().getProvince())
                .cinemaDistrict(address.get().getDistrict())
                .cinemaWard(address.get().getWard())
                .build();
    }
}
