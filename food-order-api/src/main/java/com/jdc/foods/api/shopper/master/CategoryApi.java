package com.jdc.foods.api.shopper.master;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.CategoryForm;
import com.jdc.foods.api.shopper.master.input.CategorySearch;
import com.jdc.foods.api.shopper.master.output.CategoryDetails;
import com.jdc.foods.api.shopper.master.output.CategoryListItem;
import com.jdc.foods.api.shopper.master.service.CategoryManagementService;
import com.jdc.foods.utils.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("categoryMasterApi")
@RequestMapping("shopper/categories")
public class CategoryApi {
	
	private final CategoryManagementService service;

	@GetMapping
	List<CategoryListItem> search(CategorySearch form) {
		return service.search(form);
	}
	
	@GetMapping("{id}")
	CategoryDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated CategoryForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated CategoryForm form) {
		return service.update(id, form);
	}
	
}
