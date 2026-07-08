package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.util.List;

import com.jdc.foods.model.consts.Status;

public record CuisineForEdit(
		int id,
		String name,
		String description,
		String category,
		boolean isRegular,
		String spiceLevel,
		BigDecimal price,
		Status status,
		List<Ingredient> ingredients) {

}
