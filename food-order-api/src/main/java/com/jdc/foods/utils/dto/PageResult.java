package com.jdc.foods.utils.dto;

import java.util.List;

public record PageResult<T>(
		List<T> contents,
		Pager pager) {

}
