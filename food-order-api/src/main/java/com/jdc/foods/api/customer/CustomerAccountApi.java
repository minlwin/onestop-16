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
import com.jdc.foods.api.customer.service.CustomerAccountService;
import com.jdc.foods.api.customer.service.CustomerAddressService;
import com.jdc.foods.api.shopper.account.output.DeliveryAddress;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("customer/account")
public class CustomerAccountApi {
	
	private final CustomerAccountService accountService;
	private final CustomerAddressService addressService;

	@GetMapping("profile")
	CustomerProfile profile() {
		return accountService.getProfile();
	}

	@PutMapping("profile")
	ModificationResult<Integer> updateProfile(
			@RequestBody @Validated ProfileForm form) {
		return accountService.update(form);
	}

	@PostMapping("password")
	ModificationResult<Integer> changePassword(
			@RequestBody @Validated ChangePasswordForm form) {
		return accountService.changePassword(form);
	}

	@GetMapping("addresses")
	List<DeliveryAddress> addresses() {
		return addressService.findAddresses();
	}

	@PostMapping("addresses")
	ModificationResult<Integer> addAddress(
			@RequestBody @Validated AddressForm form) {
		return addressService.createAddress(form);
	}

	@DeleteMapping("addresses/{id}")
	void removeAddress(@PathVariable int id) {
		addressService.removeAddress(id);
	}

}
