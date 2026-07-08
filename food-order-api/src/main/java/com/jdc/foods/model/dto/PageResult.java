package com.jdc.foods.model.dto;

import java.util.List;

public record PageResult<T>(
		List<T> contents,
		Pager pager) {

}
