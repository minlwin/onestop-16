package com.jdc.foods.api.shopper.master;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.PaymentInfoForm;
import com.jdc.foods.api.shopper.master.input.PaymentInfoSearch;
import com.jdc.foods.api.shopper.master.output.PaymentInfoDetails;
import com.jdc.foods.api.shopper.master.output.PaymentInfoListItem;
import com.jdc.foods.api.shopper.master.service.PaymentInfoManagementService;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("paymentInfoMasterApi")
@RequestMapping("shopper/payment-infos")
public class PaymentInfoApi {

	private final PaymentInfoManagementService service;

	@GetMapping
	List<PaymentInfoListItem> search(PaymentInfoSearch form) {
		return service.search(form);
	}

	@GetMapping("{id}")
	PaymentInfoDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated PaymentInfoForm form) {
		return service.create(form);
	}

	@PostMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated PaymentInfoForm form) {
		return service.update(id, form);
	}

}
