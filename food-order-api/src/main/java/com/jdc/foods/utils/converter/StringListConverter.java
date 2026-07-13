package com.jdc.foods.utils.converter;

import java.util.List;

import jakarta.persistence.AttributeConverter;

public class StringListConverter implements AttributeConverter<List<String>, String>{

	@Override
	public String convertToDatabaseColumn(List<String> attribute) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		return null;
	}

}
