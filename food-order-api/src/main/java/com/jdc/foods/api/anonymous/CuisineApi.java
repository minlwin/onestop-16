package com.jdc.foods.api.anonymous;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.foods.api.shopper.master.input.CuisineSearch;
import com.jdc.foods.api.shopper.master.output.CuisineDetails;
import com.jdc.foods.api.shopper.master.output.CuisineListItem;
import com.jdc.foods.utils.dto.PageResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/cuisines")
public class CuisineApi {

	@GetMapping
	PageResult<CuisineListItem> search(CuisineSearch form, 	
			@RequestParam(required = false, defaultValue = "0") Integer page,
			@RequestParam(required = false, defaultValue = "10") Integer size) {
		return new PageResult<CuisineListItem>(List.of(), null);
	}

	@GetMapping("{id}")
	CuisineDetails findById(@PathVariable int id) {
		return null;
	}

}
