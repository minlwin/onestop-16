package com.jdc.foods.utils.converter;

import java.util.List;

import com.jdc.foods.utils.dto.Ingredient;

import jakarta.persistence.AttributeConverter;

public class IngredientsConverter implements AttributeConverter<List<Ingredient>, String>{

	@Override
	public String convertToDatabaseColumn(List<Ingredient> attribute) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Ingredient> convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		return null;
	}

}
