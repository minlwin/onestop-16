package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.consts.Status;

public record CategoryDetails(
		int id,
		String name,
		List<CuisineListItem> cusines,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

}
