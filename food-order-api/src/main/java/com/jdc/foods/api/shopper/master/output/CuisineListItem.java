package com.jdc.foods.api.shopper.master.output;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.jdc.foods.utils.consts.Status;
import com.jdc.foods.utils.dto.IdAndName;

public record CuisineListItem(
		int id,
		String name,
		IdAndName category,
		String spiceLevel,
		boolean isRegular,
		BigDecimal price,
		String description,
		String coverPhoto,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

}
