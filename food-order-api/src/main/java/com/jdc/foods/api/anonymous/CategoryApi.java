package com.jdc.foods.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.anonymous.service.CategoryService;
import com.jdc.foods.api.shopper.master.output.CategoryListItem;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/categories")
public class CategoryApi {
	
	private final CategoryService service;

	@GetMapping
	List<CategoryListItem> search() {
		return service.findAll();
	}

}
