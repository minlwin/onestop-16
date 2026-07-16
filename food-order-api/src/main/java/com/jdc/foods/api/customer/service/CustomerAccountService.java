package com.jdc.foods.api.customer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.customer.input.ChangePasswordForm;
import com.jdc.foods.api.customer.input.ProfileForm;
import com.jdc.foods.api.customer.output.CustomerProfile;
import com.jdc.foods.utils.dto.ModificationResult;
import com.jdc.foods.utils.exceptions.BusinessRuleViolationException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerAccountService {

	private final CurrentCustomerService currentCustomer;

	@Transactional(readOnly = true)
	public CustomerProfile getProfile() {
		var customer = currentCustomer.get();

		return new CustomerProfile(
				customer.getAccount().getName(),
				customer.getPhone(),
				customer.getAccount().getEmail());
	}

	public ModificationResult<Integer> update(ProfileForm form) {
		var customer = currentCustomer.get();

		customer.setPhone(form.phone());
		customer.getAccount().setName(form.name());
		customer.getAccount().setEmail(form.email());

		return ModificationResult.ok(customer.getId());
	}

	public ModificationResult<Integer> changePassword(ChangePasswordForm form) {
		var customer = currentCustomer.get();
		var account = customer.getAccount();

		if(!account.getEmail().equalsIgnoreCase(form.email())) {
			throw new BusinessRuleViolationException("Email does not match your account.");
		}

		if(!account.getPassword().equals(form.oldPass())) {
			throw new BusinessRuleViolationException("Old password is incorrect.");
		}

		if(!form.newPass().equals(form.confPass())) {
			throw new BusinessRuleViolationException("New password and confirm password do not match.");
		}

		account.setPassword(form.newPass());

		return ModificationResult.ok(customer.getId());
	}

}
