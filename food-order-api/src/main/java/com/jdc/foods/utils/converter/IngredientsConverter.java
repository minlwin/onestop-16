package com.jdc.foods.utils.converter;

import java.util.List;

import org.springframework.stereotype.Component;

import com.jdc.foods.utils.dto.Ingredient;

import jakarta.persistence.AttributeConverter;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class IngredientsConverter implements AttributeConverter<List<Ingredient>, String>{

	private final ObjectMapper objectMapper;
	
	@Override
	public String convertToDatabaseColumn(List<Ingredient> attribute) {
		
		if(null != attribute) {
			return objectMapper.writeValueAsString(attribute);
		}
		
		return null;
	}

	@Override
	public List<Ingredient> convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		return null;
	}

}
