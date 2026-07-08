package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.consts.Status;
import com.jdc.foods.model.dto.IdAndName;

public record CuisineDetails(
		int id,
		String name,
		String description,
		IdAndName category,
		String spiceLevel,
		boolean isRegular,
		BigDecimal price,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt,
		String coverPhoto,
		List<String> photos,
		List<Ingredient> ingredients) {

}
