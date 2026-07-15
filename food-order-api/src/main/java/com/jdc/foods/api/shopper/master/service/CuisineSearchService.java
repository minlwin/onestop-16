package com.jdc.foods.api.shopper.master.service;

import com.jdc.foods.api.shopper.master.input.CuisineSearch;
import com.jdc.foods.api.shopper.master.output.CuisineDetails;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;
import com.jdc.foods.utils.dto.PageResult;

public interface CuisineSearchService {

	PageResult<CuisineListItem> search(CuisineSearch form, Integer page, Integer size);

	CuisineDetails findById(int id);

}