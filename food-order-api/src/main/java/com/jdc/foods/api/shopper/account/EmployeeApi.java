package com.jdc.foods.api.shopper.account;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.account.input.EmployeeForm;
import com.jdc.foods.api.shopper.account.input.EmployeeSearch;
import com.jdc.foods.api.shopper.account.output.EmployeeDetails;
import com.jdc.foods.api.shopper.account.output.EmployeeListItem;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("shopper/employees")
public class EmployeeApi {

	@GetMapping
	List<EmployeeListItem> search(EmployeeSearch form) {
		return List.of();
	}

	@GetMapping("{id}")
	EmployeeDetails findById(@PathVariable int id) {
		return null;
	}

	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated EmployeeForm form) {
		return new ModificationResult<Integer>(1);
	}

	@PostMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated EmployeeForm form) {
		return new ModificationResult<Integer>(id);
	}

}
