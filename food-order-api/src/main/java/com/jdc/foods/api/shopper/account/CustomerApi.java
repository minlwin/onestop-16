package com.jdc.foods.api.shopper.account;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.account.input.CustomerSearch;
import com.jdc.foods.api.shopper.account.output.CustomerDetails;
import com.jdc.foods.api.shopper.account.output.CustomerListItem;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("shopper/customers")
public class CustomerApi {

	@GetMapping
	PageResult<CustomerListItem> search(CustomerSearch form) {
		return new PageResult<CustomerListItem>(List.of(), null);
	}

	@GetMapping("{id}")
	CustomerDetails findById(@PathVariable int id) {
		return null;
	}

}
