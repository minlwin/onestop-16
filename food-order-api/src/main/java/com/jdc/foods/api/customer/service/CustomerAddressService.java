package com.jdc.foods.api.customer.service;

import static com.jdc.foods.utils.EntityUtils.safeCall;

import java.util.List;
import java.util.UUID;

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

	public ModificationResult<UUID> createAddress(AddressForm form) {
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

		return ModificationResult.ok(repo.save(entity).getId());
	}

	public void removeAddress(String id) {
		var customer = currentCustomer.get();
		var address = safeCall(repo.findById(UUID.fromString(id)))
				.apply("delivery address")
				.apply("id")
				.apply(id);
		
		if(address.getCustomer() == null || address.getCustomer().getId() != customer.getId()) {
			throw new BusinessRuleViolationException("You can't remove other address.");
		}
				
		address.setCustomer(null);
	}

}
