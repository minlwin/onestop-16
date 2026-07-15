package com.jdc.foods.api.customer.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.model.account.entity.Customer;
import com.jdc.foods.model.account.repo.AccountRepo;
import com.jdc.foods.model.account.repo.CustomerRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CurrentCustomerService {

	private final AccountRepo accountRepo;
	private final CustomerRepo customerRepo;

	@Transactional(readOnly = true)
	public Customer get() {
		var email = SecurityContextHolder.getContext().getAuthentication().getName();
		var account = safeCall(accountRepo.findByEmail(email)).apply("account", email);

		return safeCall(customerRepo.findByAccount(account)).apply("customer", account.getId());
	}

}
