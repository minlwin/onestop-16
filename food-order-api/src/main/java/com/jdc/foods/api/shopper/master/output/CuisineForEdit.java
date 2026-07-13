package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.util.List;

import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.Ingredient;

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
