package com.jdc.foods.api.anonymous.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jdc.foods.api.shopper.master.input.CuisineSearch;
import com.jdc.foods.api.shopper.master.output.CuisineDetails;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;
import com.jdc.foods.api.shopper.master.service.CuisineSearchService;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CuisineService {

	private final CuisineSearchService service;

	public PageResult<CuisineListItem> search(CuisineSearch form, Integer page, Integer size) {
		return service.search(form, page, size);
	}

	public CuisineDetails findById(int id) {
		return service.findById(id);
	}

	public List<CuisineListItem> getWeeklySpecial() {
		// TODO Auto-generated method stub
		return null;
	}
}
