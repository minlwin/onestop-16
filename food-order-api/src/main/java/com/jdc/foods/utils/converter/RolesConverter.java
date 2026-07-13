package com.jdc.foods.utils.converter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.account.entity.Account.Role;

import jakarta.persistence.AttributeConverter;

public class RolesConverter implements AttributeConverter<List<Role>, String>{

	@Override
	public String convertToDatabaseColumn(List<Role> attribute) {
		
		if(null != attribute) {
			return attribute.stream().map(a -> a.name())
					.collect(Collectors.joining(","));
		}
		
		return null;
	}

	@Override
	public List<Role> convertToEntityAttribute(String dbData) {
		
		if(StringUtils.hasLength(dbData)) {
			return Arrays.stream(dbData.split(","))
					.map(Role::valueOf)
					.toList();
		}
		
		return null;
	}

}
