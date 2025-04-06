package com.backend.movieticketbooking.services.cinema.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.cinema.CinemaDTO;
import com.backend.movieticketbooking.dtos.cinema.CinemaHallDTO;
import com.backend.movieticketbooking.dtos.cinema.request.CreateCinemaHallRequest;
import com.backend.movieticketbooking.entities.cinema.CinemaEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallEntity;
import com.backend.movieticketbooking.entities.cinema.CinemaHallSeatEntity;
import com.backend.movieticketbooking.entities.other.AddressEntity;
import com.backend.movieticketbooking.enums.SeatTypeEnum;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.mapper.CinemaHallSeatMapper;
import com.backend.movieticketbooking.repositories.AddressRepository;
import com.backend.movieticketbooking.repositories.CinemaHallRepository;
import com.backend.movieticketbooking.repositories.CinemaHallSeatRepository;
import com.backend.movieticketbooking.repositories.CinemaRepository;
import com.backend.movieticketbooking.services.cinema.CinemaService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CinemaServiceImpl implements CinemaService {

    CinemaRepository cinemaRepository;

    CinemaHallRepository cinemaHallRepository;

    CinemaHallSeatRepository cinemaHallSeatRepository;

    AddressRepository addressRepository;

    CinemaHallSeatMapper cinemaHallSeatMapper;


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
                .cinemaId(cinema.getCinemaId())
                .cinemaName(cinema.getCinemaName())
                .cinemaStreet(cinema.getCinemaStreet())
                .cinemaProvince(address.get().getProvince())
                .cinemaDistrict(address.get().getDistrict())
                .cinemaWard(address.get().getWard())
                .build();
    }

    // 16 -> 8
    @Override
    @Transactional
    public CinemaHallDTO createHall(CreateCinemaHallRequest request) {
        Integer coupleSeatNumber = request.getSeats().get(SeatTypeEnum.COUPLE);
        Integer standardSeatNumber = request.getSeats().get(SeatTypeEnum.STANDARD);
        if (coupleSeatNumber > 8) {
            throw new BadRequestException(ErrorCode.INVALID_COUPLE_TYPE_SEAT_NUMBER);
        }
        if (standardSeatNumber % 16 != 0) {
            throw new BadRequestException(ErrorCode.INVALID_STANDARD_TYPE_SEAT_NUMBER);
        }
        Optional<CinemaEntity> foundCinema = cinemaRepository.findById(request.getCinemaId());
        if (foundCinema.isEmpty()) {
            throw new BadRequestException(ErrorCode.CINEMA_NOT_FOUND);
        }

        Integer totalSeats = coupleSeatNumber + standardSeatNumber;

        List<CinemaHallSeatEntity> seats = new ArrayList<>();
        int totalStandardRows = (int) standardSeatNumber / 16;

        CinemaHallEntity cinemaHall = CinemaHallEntity.builder()
                .cinema(foundCinema.get())
                .cinemaHallName(request.getCinemaHallName())
                .cinemaSeatsNumberAvailable(totalSeats)
                .build();

        cinemaHallRepository.save(cinemaHall);

        for (int row = 0; row < totalStandardRows; row++) {
            char rowLetter = (char) ('A' + row);
            for (int col = 1; col <= 16; col++) {
                seats.add(generateCinemaHallSeat(String.valueOf(rowLetter), String.valueOf(col), SeatTypeEnum.STANDARD, cinemaHall));
            }
        }

        int startCol = 16 - (coupleSeatNumber * 2);

        char rowLetter = (char) ('A' + totalStandardRows - 1);
        for (int i = 0; i < coupleSeatNumber; i++) {
            int col1 = startCol + i * 2;
            int col2 = col1 + 1;
            String col = col1 + "" + col2;

            seats.add(generateCinemaHallSeat(String.valueOf(rowLetter), col, SeatTypeEnum.COUPLE, cinemaHall));
        }


        cinemaHallSeatRepository.saveAll(seats);

        cinemaHall.setCinemaHallSeats(seats);
        cinemaHallRepository.save(cinemaHall);

        return CinemaHallDTO.builder()
                .cinemaId(foundCinema.get().getCinemaId())
                .cinemaHallName(cinemaHall.getCinemaHallName())
                .cinemaSeatsNumberAvailable(cinemaHall.getCinemaSeatsNumberAvailable())
                .cinemaHallId(cinemaHall.getCinemaHallId())
                .cinemaHallSeats(cinemaHallSeatMapper.toCinemaHallSeatDTO(cinemaHall.getCinemaHallSeats()))
                .build();
    }

    CinemaHallSeatEntity generateCinemaHallSeat(String row, String col, SeatTypeEnum seatType, CinemaHallEntity cinemaHall) {
        return CinemaHallSeatEntity.builder()
                .seatRow(row)
                .seatCol(col)
                .seatType(seatType)
                .cinemaHall(cinemaHall)
                .build();
    }

}
