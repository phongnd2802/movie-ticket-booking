package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import com.backend.movieticketbooking.dtos.other.DistrictDTO;
import com.backend.movieticketbooking.dtos.other.ProvinceDTO;
import com.backend.movieticketbooking.dtos.other.WardDTO;
import com.backend.movieticketbooking.services.common.CommonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressController {

    CommonService commonService;

    @GetMapping("/provinces")
    public ApiResponse<ProvinceDTO> getProvinces() {
        return ApiResponse.success(commonService.getAllProvinces());
    }

    @GetMapping("/districts")
    public ApiResponse<DistrictDTO> getDistrictsByProvince(@RequestParam("province") String province) {
        DistrictDTO result = commonService.getAllDistrictsByProvince(province);
        return ApiResponse.success(result);
    }

    @GetMapping("/wards")
    public ApiResponse<WardDTO> getWardsByProvinceAndDistrict(@RequestParam("province") String province, @RequestParam("district") String district) {
        return ApiResponse.success(commonService.getAllWardByProvinceAndDistrict(province, district));
    }

}
