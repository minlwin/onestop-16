package com.jdc.foods.api.shopper.management;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.management.input.InvoiceSearch;
import com.jdc.foods.api.shopper.management.output.InvoiceDetails;
import com.jdc.foods.api.shopper.management.output.InvoiceListItem;
import com.jdc.foods.api.shopper.management.service.InvoiceManagementService;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("invoiceManagementApi")
@RequestMapping("shopper/management/invoices")
public class InvoiceManagementApi {
	
	private final InvoiceManagementService service;

	@GetMapping
	PageResult<InvoiceListItem> search(InvoiceSearch form, 
			@RequestParam(required = false, defaultValue = "0") Integer page,
			@RequestParam(required = false, defaultValue = "10") Integer size) {
		return service.search(form, page, size);
	}

	@GetMapping("{id}")
	InvoiceDetails findById(@PathVariable String id) {
		return service.findById(id);
	}

}
