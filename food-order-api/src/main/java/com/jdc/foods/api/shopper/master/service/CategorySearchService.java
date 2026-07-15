package com.jdc.foods.api.shopper.master.service;

import java.util.List;

import com.jdc.foods.api.shopper.master.input.CategorySearch;
import com.jdc.foods.api.shopper.master.output.CategoryListItem;

public interface CategorySearchService {

	List<CategoryListItem> search(CategorySearch form);

}