package com.backend.movieticketbooking.repositories;

import com.backend.movieticketbooking.entities.other.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {

    @Query("SELECT DISTINCT a.province FROM AddressEntity a")
    List<String> findDistinctProvinces();

    @Query("SELECT DISTINCT a.district FROM AddressEntity a WHERE a.province = :province")
    List<String> findDistrictsByProvince(String province);

    @Query("SELECT DISTINCT a.ward FROM AddressEntity a WHERE a.province = :province AND a.district = :district")
    List<String> findWardsByProvinceAndDistrict(String province, String district);

    Optional<AddressEntity> findByProvinceAndDistrictAndWard(String province, String district, String ward);
}
