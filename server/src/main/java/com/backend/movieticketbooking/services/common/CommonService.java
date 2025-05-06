package com.backend.movieticketbooking.services.common;

import com.backend.movieticketbooking.dtos.other.DistrictDTO;
import com.backend.movieticketbooking.dtos.other.ProvinceDTO;
import com.backend.movieticketbooking.dtos.other.WardDTO;

public interface CommonService {
    ProvinceDTO getAllProvinces();
    DistrictDTO getAllDistrictsByProvince(String province);
    WardDTO getAllWardByProvinceAndDistrict(String province, String district);
}
