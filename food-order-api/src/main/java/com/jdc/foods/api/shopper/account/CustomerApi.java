package com.jdc.foods.api.shopper.account;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.account.input.CustomerSearch;
import com.jdc.foods.api.shopper.account.output.CustomerDetails;
import com.jdc.foods.api.shopper.account.output.CustomerListItem;
import com.jdc.foods.api.shopper.account.service.CustomerManagementService;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("shopper/customers")
public class CustomerApi {
	
	private final CustomerManagementService service;

	@GetMapping
	PageResult<CustomerListItem> search(CustomerSearch form, 
			@RequestParam(required = false, defaultValue = "0") Integer page,
			@RequestParam(required = false, defaultValue = "10") Integer size) {
		return service.search(form, page, size);
	}

	@GetMapping("{id}")
	CustomerDetails findById(@PathVariable int id) {
		return service.findById(id);
	}

}
