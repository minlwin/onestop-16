package com.jdc.foods.utils;

import java.util.Optional;
import java.util.function.BiFunction;

import com.jdc.foods.utils.exceptions.BusinessRuleViolationException;

public class EntityUtils {

	public static<T, ID> BiFunction<String, ID, T> safeCall(Optional<T> optional) {
		return (resource, id) -> optional.orElseThrow(() -> new BusinessRuleViolationException(message(resource, id)));
	}
	
	public static<ID> String message(String resource, ID id) {
		return "There is no %s with id %s.".formatted(resource, id);
	}
}
