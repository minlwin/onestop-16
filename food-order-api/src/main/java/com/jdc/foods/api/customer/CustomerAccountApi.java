package com.jdc.foods.api.customer;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.customer.input.AddressForm;
import com.jdc.foods.api.customer.input.ChangePasswordForm;
import com.jdc.foods.api.customer.input.ProfileForm;
import com.jdc.foods.api.customer.output.CustomerProfile;
import com.jdc.foods.api.shopper.account.output.DeliveryAddress;
import com.jdc.foods.model.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("customer/account")
public class CustomerAccountApi {

	@GetMapping("profile")
	CustomerProfile profile() {
		return null;
	}

	@PutMapping("profile")
	ModificationResult<Integer> updateProfile(
			@RequestBody @Validated ProfileForm form) {
		return new ModificationResult<Integer>(1);
	}

	@PostMapping("password")
	ModificationResult<Integer> changePassword(
			@RequestBody @Validated ChangePasswordForm form) {
		return new ModificationResult<Integer>(1);
	}

	@GetMapping("addresses")
	List<DeliveryAddress> addresses() {
		return List.of();
	}

	@PostMapping("addresses")
	ModificationResult<Integer> addAddress(
			@RequestBody @Validated AddressForm form) {
		return new ModificationResult<Integer>(1);
	}

	@DeleteMapping("addresses/{id}")
	void removeAddress(@PathVariable int id) {
	}

}
