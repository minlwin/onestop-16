package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.util.List;

import com.jdc.foods.model.master.entity.Cuisine;
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

	public static CuisineForEdit from(Cuisine entity) {
		return new CuisineForEdit(
				entity.getId(),
				entity.getName(),
				entity.getDescription(),
				String.valueOf(entity.getCategory().getId()),
				entity.isRegular(),
				entity.getSpiceLevel() == null ? null : entity.getSpiceLevel().name(),
				entity.getPrice(),
				entity.getDeletedAt() == null ? Status.Enable : Status.Disable,
				entity.getIngredients());
	}
}
