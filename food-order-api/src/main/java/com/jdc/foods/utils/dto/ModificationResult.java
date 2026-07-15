package com.jdc.foods.utils.dto;

public record ModificationResult<T>(
		T id) {
	
	public static<T> ModificationResult<T> ok(T id) {
		return new ModificationResult<>(id);
	}
}
