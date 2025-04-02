package com.backend.movieticketbooking.security.jwt;

import com.backend.movieticketbooking.common.ErrorResponse;
import com.backend.movieticketbooking.security.userprinciple.UserDetailService;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private DistributedCacheService redisCacheService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Set<String> PUBLIC_ENDPOINTS = Set.of(
            "/api/v1/auth/register",
            "/api/v1/auth/login",
            "/api/v1/auth/verify-otp",
            "/api/v1/auth/otp-session",
            "/api/v1/auth/resend-otp",
            "/api/v1/hi"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            if (isPublicEndpoint(request)) {
                filterChain.doFilter(request, response);
                return;
            }
            String token = getJwt(request);
            if (token == null) {
                unauthorizedResponse(response, 401, "Invalid or expired token");
                return;
            }
            Claims claims = jwtProvider.validateToken(token);
            if (claims == null) {
                unauthorizedResponse(response, 401, "Invalid or expired token");
                return;
            }
            boolean isBlacklisted  = redisCacheService.exists(getUserKeyBlackList(claims.getSubject()));
            if (isBlacklisted ) {
                unauthorizedResponse(response, 401, "Token has been revoked");
                return;
            }
            String username = jwtProvider.getEmailFromToken(token);
            UserDetails userDetails = userDetailService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        } catch (Exception e) {
            log.error("Can't set user authentication -> Message: ", e);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwt(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7).trim();
        }
        return null;
    }

    private String getUserKeyBlackList(String subjectUUID) {
        return "usr:" + subjectUUID + ":" + "blacklist";
    }

    private void unauthorizedResponse(HttpServletResponse response, int code, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ErrorResponse errorResponse = ErrorResponse.builder()
                .code(code)
                .message(message)
                .error(null)
                .build();

        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }

    private boolean isPublicEndpoint(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return PUBLIC_ENDPOINTS.contains(uri);
    }
}
