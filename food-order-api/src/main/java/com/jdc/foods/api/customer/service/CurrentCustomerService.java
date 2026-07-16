package com.jdc.foods.api.customer.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.model.account.entity.Customer;
import com.jdc.foods.model.account.repo.CustomerRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CurrentCustomerService {

	private final CustomerRepo customerRepo;

	@Transactional(readOnly = true)
	public Customer get() {
		var email = SecurityContextHolder.getContext().getAuthentication().getName();
		return safeCall(customerRepo.findByAccountEmail(email))
				.apply("customer")
				.apply("email")
				.apply(email);
	}

}
