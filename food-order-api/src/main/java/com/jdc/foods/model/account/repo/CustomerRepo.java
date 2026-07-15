package com.jdc.foods.model.account.repo;

import java.util.Optional;

import com.jdc.foods.model.BaseRepository;
import com.jdc.foods.model.account.entity.Account;
import com.jdc.foods.model.account.entity.Customer;

public interface CustomerRepo extends BaseRepository<Customer, Integer>{

	Optional<Customer> findByAccount(Account account);

}
