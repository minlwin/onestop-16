package com.jdc.foods.api.customer.service;

import static com.jdc.foods.utils.EntityUtils.message;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.foods.api.customer.input.AddressForm;
import com.jdc.foods.api.shopper.account.output.DeliveryAddress;
import com.jdc.foods.model.management.repo.DeliveryAddressRepo;
import com.jdc.foods.utils.dto.ModificationResult;
import com.jdc.foods.utils.exceptions.BusinessRuleViolationException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerAddressService {

	private final CurrentCustomerService currentCustomer;
	private final DeliveryAddressRepo repo;

	@Transactional(readOnly = true)
	public List<DeliveryAddress> findAddresses() {
		return currentCustomer.get().getAddress().stream()
				.map(DeliveryAddress::from)
				.toList();
	}

	public ModificationResult<Integer> createAddress(AddressForm form) {
		var customer = currentCustomer.get();

		if(Boolean.TRUE.equals(form.isDefault())) {
			customer.getAddress().forEach(address -> address.setDefault(false));
		}

		var entity = new com.jdc.foods.model.management.entity.DeliveryAddress();
		entity.setLabel(form.label());
		entity.setPhone(customer.getPhone());
		entity.setAddress(form.address());
		entity.setTownship(form.township());
		entity.setDefault(Boolean.TRUE.equals(form.isDefault()));
		entity.setCustomer(customer);

		return ModificationResult.ok(repo.save(entity).getId().hashCode());
	}

	public void removeAddress(int id) {
		var address = currentCustomer.get().getAddress().stream()
				.filter(entity -> entity.getId().hashCode() == id)
				.findFirst()
				.orElseThrow(() -> new BusinessRuleViolationException(message("address", id)));

		repo.delete(address);
	}

}
