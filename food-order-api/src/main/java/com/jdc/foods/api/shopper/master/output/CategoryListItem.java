package com.jdc.foods.api.shopper.master.output;

import java.time.LocalDateTime;

import com.jdc.foods.utils.consts.Status;

public record CategoryListItem(
		int id,
		String name,
		long cusines,
		Status status,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

}
