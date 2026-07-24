package com.jdc.foods.model.management.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;

import com.jdc.foods.model.BaseRepository;
import com.jdc.foods.model.management.entity.DeliveryAddress;

public interface DeliveryAddressRepo extends BaseRepository<DeliveryAddress, UUID>{

	@Query("select a from DeliveryAddress a where a.township = :township and a.phone = :phone and a.address = :address")
	Optional<DeliveryAddress> findOne(String phone, String township, String address);
}
