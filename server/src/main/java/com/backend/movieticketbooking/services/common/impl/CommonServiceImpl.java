package com.backend.movieticketbooking.services.common.impl;

import com.backend.movieticketbooking.dtos.other.DistrictDTO;
import com.backend.movieticketbooking.dtos.other.ProvinceDTO;
import com.backend.movieticketbooking.dtos.other.WardDTO;
import com.backend.movieticketbooking.repositories.AddressRepository;
import com.backend.movieticketbooking.services.common.CommonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommonServiceImpl implements CommonService {

    AddressRepository addressRepository;

    @Override
    public ProvinceDTO getAllProvinces() {
        return ProvinceDTO.builder()
                .provinces(addressRepository.findDistinctProvinces())
                .build();
    }

    @Override
    public DistrictDTO getAllDistrictsByProvince(String province) {
        return DistrictDTO.builder()
                .province(province)
                .districts(addressRepository.findDistrictsByProvince(province))
                .build();
    }

    @Override
    public WardDTO getAllWardByProvinceAndDistrict(String province, String district) {
        return WardDTO.builder()
                .province(province)
                .district(district)
                .wards(addressRepository.findWardsByProvinceAndDistrict(province, district))
                .build();
    }
}
