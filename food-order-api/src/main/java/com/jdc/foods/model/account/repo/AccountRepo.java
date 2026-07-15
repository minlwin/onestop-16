package com.jdc.foods.model.account.repo;

import java.util.Optional;

import com.jdc.foods.model.BaseRepository;
import com.jdc.foods.model.account.entity.Account;

public interface AccountRepo extends BaseRepository<Account, Integer>{

	Optional<Account> findByEmail(String email);

}
