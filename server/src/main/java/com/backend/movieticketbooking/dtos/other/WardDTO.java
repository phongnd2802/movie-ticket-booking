package com.backend.movieticketbooking.dtos.other;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WardDTO {
    private String province;
    private String district;
    private List<String> wards;
}
