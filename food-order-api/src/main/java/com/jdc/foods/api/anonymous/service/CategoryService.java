package com.jdc.foods.api.anonymous.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jdc.foods.api.shopper.master.input.CategorySearch;
import com.jdc.foods.api.shopper.master.output.CategoryListItem;
import com.jdc.foods.api.shopper.master.service.CategorySearchService;
import com.jdc.foods.utils.consts.Status;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
	
	private final CategorySearchService managementService;

	public List<CategoryListItem> findAll() {
		var list = managementService.search(CategorySearch.getDefault());
		return list.stream()
				.filter(a -> a.cusines() > 0)
				.filter(a -> a.status() == Status.Enable)
				.toList();
	}

}
