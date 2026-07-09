package com.jdc.foods.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.CategorySearch;
import com.jdc.foods.api.shopper.master.output.CategoryDetails;
import com.jdc.foods.api.shopper.master.output.CategoryListItem;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/categories")
public class CategoryApi {

	@GetMapping
	List<CategoryListItem> search(CategorySearch form) {
		return List.of();
	}

	@GetMapping("{id}")
	CategoryDetails findById(@PathVariable int id) {
		return null;
	}

}
