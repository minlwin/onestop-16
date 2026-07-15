package com.jdc.foods.utils.converter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.util.StringUtils;

import jakarta.persistence.AttributeConverter;

public class StringListConverter implements AttributeConverter<List<String>, String>{

	@Override
	public String convertToDatabaseColumn(List<String> attribute) {
		if(null != attribute) {
			return attribute.stream()
					.collect(Collectors.joining(","));
		}
		return null;
	}

	@Override
	public List<String> convertToEntityAttribute(String dbData) {
		if(StringUtils.hasLength(dbData)) {
			return Arrays.stream(dbData.split(","))
					.toList();
		}
		return null;
	}

}
