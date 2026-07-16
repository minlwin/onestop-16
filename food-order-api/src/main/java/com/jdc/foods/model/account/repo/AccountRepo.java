package com.jdc.foods.model.account.repo;

import java.util.Optional;

import com.jdc.foods.model.BaseRepository;
import com.jdc.foods.model.account.entity.Account;

import jakarta.validation.constraints.NotBlank;

public interface AccountRepo extends BaseRepository<Account, Integer>{

	Optional<Account> findByEmail(String email);

	long countByEmail(@NotBlank(message = "Please enter email address.") String email);

}
