package com.jdc.foods.api.shopper.master.input;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.foods.model.master.entity.Category;
import com.jdc.foods.model.master.entity.Category_;
import com.jdc.foods.utils.consts.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record CategorySearch(
	Status status, 
	String keyword
) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Category> root) {
		var prediates = new ArrayList<Predicate>();
		
		if(null != status) {
			prediates.add(status == Status.Enable ? 
					cb.isNull(root.get(Category_.deletedAt)) : 
					cb.isNotNull(root.get(Category_.deletedAt)));
		}
		
		if(StringUtils.hasLength(keyword)) {
			prediates.add(
					cb.like(cb.lower(root.get(Category_.name)), 
							keyword.toLowerCase().concat("%")));
		}
		
		return prediates;
	}

	public static CategorySearch getDefault() {
		return new CategorySearch(null, null);
	}

}
