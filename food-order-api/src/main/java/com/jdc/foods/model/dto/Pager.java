package com.jdc.foods.model.dto;

import java.util.List;

public record Pager(
		int page,
		int size,
		int totalCount,
		int totalPage,
		List<Integer> links) {

}
