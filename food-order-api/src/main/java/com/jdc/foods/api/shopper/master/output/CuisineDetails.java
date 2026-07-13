package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.master.entity.Cuisine.SpiceLevel;
import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.IdAndName;
import com.jdc.foods.utils.dto.Ingredient;

public record CuisineDetails(
		int id,
		String name,
		String description,
		IdAndName category,
		SpiceLevel spiceLevel,
		boolean isRegular,
		BigDecimal price,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt,
		String coverPhoto,
		List<String> photos,
		List<Ingredient> ingredients) {

}
