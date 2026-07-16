package com.jdc.foods.utils;

import java.util.Optional;
import java.util.function.Function;

import com.jdc.foods.utils.exceptions.BusinessRuleViolationException;

public class EntityUtils {
	
	public static<T, ID> Function<String, Function<String, Function<ID, T>>> safeCall(Optional<T> optional) {
		return resource -> idType -> id -> optional.orElseThrow(() -> new BusinessRuleViolationException(message(resource, idType, id)));
	}
	
	public static<ID> String message(String resource, String idType, ID id) {
		return "There is no %s with %s %s.".formatted(resource, idType, id);
	}
}
