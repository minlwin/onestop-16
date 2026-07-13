package com.jdc.foods.utils.dto;

import jakarta.persistence.Embeddable;

@Embeddable
public record Ingredient(
		String name,
		String value) {
}
