package com.backend.movieticketbooking.dtos.other;


import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class DistrictDTO {
    private String province;
    private List<String> districts;
}
