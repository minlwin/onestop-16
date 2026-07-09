package com.jdc.foods.api.customer;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.management.input.InvoiceSearch;
import com.jdc.foods.api.shopper.management.output.InvoiceDetails;
import com.jdc.foods.api.shopper.management.output.InvoiceListItem;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("customer/orders")
public class InvoiceHistoryApi {

	@GetMapping
	List<InvoiceListItem> search(InvoiceSearch form) {
		return List.of();
	}

	@GetMapping("{id}")
	InvoiceDetails findById(@PathVariable String id) {
		return null;
	}

}
