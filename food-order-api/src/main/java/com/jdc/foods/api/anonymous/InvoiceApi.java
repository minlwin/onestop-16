package com.jdc.foods.api.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.anonymous.input.CheckoutForm;
import com.jdc.foods.api.shopper.management.output.InvoiceDetails;
import com.jdc.foods.model.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/invoices")
public class InvoiceApi {

	@PostMapping
	ModificationResult<String> checkout(
			@RequestBody @Validated CheckoutForm form) {
		return new ModificationResult<String>("INV-0001");
	}

	@GetMapping("{id}")
	InvoiceDetails findById(@PathVariable String id) {
		return null;
	}

}
