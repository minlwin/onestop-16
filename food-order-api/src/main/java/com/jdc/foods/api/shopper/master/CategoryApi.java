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
import com.jdc.foods.model.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController("categoryMasterApi")
@RequestMapping("shopper/categories")
public class CategoryApi {

	@GetMapping
	List<CategoryListItem> search(CategorySearch form) {
		return List.of();
	}
	
	@GetMapping("{id}")
	CategoryDetails findById(@PathVariable int id) {
		return null;
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated CategoryForm form) {
		return new ModificationResult<Integer>(1);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated CategoryForm form) {
		return new ModificationResult<Integer>(id);
	}
	
}
