package com.jdc.foods.api.shopper.master;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.DeliTimeForm;
import com.jdc.foods.api.shopper.master.input.DeliTimeSearch;
import com.jdc.foods.api.shopper.master.output.DeliTimeDetails;
import com.jdc.foods.api.shopper.master.output.DeliTimeListItem;
import com.jdc.foods.api.shopper.master.service.DeliveryTimeManagementService;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("deliveryTimeMasterApi")
@RequestMapping("shopper/delivery-times")
public class DeliveryTimeApi {
	
	private final DeliveryTimeManagementService service;

	@GetMapping
	List<DeliTimeListItem> search(DeliTimeSearch form) {
		return service.search(form);
	}

	@GetMapping("{id}")
	DeliTimeDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated DeliTimeForm form) {
		return service.create(form);
	}

	@PostMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated DeliTimeForm form) {
		return service.update(id, form);
	}

}
