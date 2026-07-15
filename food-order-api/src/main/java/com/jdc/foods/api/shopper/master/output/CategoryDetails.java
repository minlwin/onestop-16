package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.foods.model.master.entity.Category;
import com.jdc.foods.utils.consts.Status;

public record CategoryDetails(
		int id,
		String name,
		List<CuisineListItem> cusines,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public static CategoryDetails from(Category entity) {
		return new CategoryDetails(
			entity.getId(),
			entity.getName(),
			entity.getCuisine().stream().map(CuisineListItem::from).toList(),
			entity.getDeletedAt() == null ? Status.Enable : Status.Disable,
			entity.getCreatedAt(),
			entity.getModifiedAt()
		);
	}
}
