package com.backend.movieticketbooking.dtos.other;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProvinceDTO {
    private List<String> provinces;
}
