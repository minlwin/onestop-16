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
import com.jdc.foods.model.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("paymentInfoMasterApi")
@RequestMapping("shopper/payment-infos")
public class PaymentInfoApi {

	@GetMapping
	List<PaymentInfoListItem> search(PaymentInfoSearch form) {
		return List.of();
	}

	@GetMapping("{id}")
	PaymentInfoDetails findById(@PathVariable int id) {
		return null;
	}

	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated PaymentInfoForm form) {
		return new ModificationResult<Integer>(1);
	}

	@PostMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated PaymentInfoForm form) {
		return new ModificationResult<Integer>(id);
	}

}
