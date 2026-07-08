package com.jdc.foods.api.shopper.master.output;

import java.util.List;

import com.jdc.foods.model.consts.Status;

public record CuisineForEdit(
		int id,
		String name,
		String description,
		String category,
		boolean isRegular,
		String spiceLevel,
		Status status,
		List<Ingredient> ingredients) {

}
