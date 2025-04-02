package com.backend.movieticketbooking.controllers;


import com.backend.movieticketbooking.common.ApiResponse;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hi")
    @RateLimiter(name = "backendA", fallbackMethod = "fallbackHello")
    public ApiResponse<String> hello() {
        return ApiResponse.success("hi");
    }

    public ApiResponse<String> fallbackHello(Throwable throwable) {
        return ApiResponse.success("Too many requests");
    }

}
